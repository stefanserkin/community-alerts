import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from "lightning/platformResourceLoader";
import cometdJS from '@salesforce/resourceUrl/cometd';
import getSessionId from '@salesforce/apex/CommunityAlertsController.getSessionId';
import getNamespace from '@salesforce/apex/CommunityAlertsController.getNamespace';
import communityUserId from '@salesforce/user/Id';

export default class CommunityAlerts extends LightningElement {
    libInitialized = false;
    sessionId;
    namespace = '';
    error;

    userId = communityUserId;
    eventChannelName = 'Community_Alert__e';

    hasMessage = false;
    @track messages = [];

    @api subtleMode = false;
    @api subtleModeHeader;
    showPopover = false;

    showDetails = true;
    toggleDetailsLabel = 'Hide';

    @wire(getSessionId)
    wiredSessionId({ error, data }) {
        if (data) {
            this.sessionId = data;
            this.error = undefined;
            loadScript(this, cometdJS)
            .then(() => {
                this.initializecometd();
            });
        } else if (error) {
            this.error = error;
            console.error(this.error);
            this.sessionId = undefined;
        }
    }

    @wire(getNamespace)
    wiredNamespace({ error, data }) {
        if (data) {
            this.namespace = data ? `${data}__` : '';
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.error(this.error);
            this.namespace = undefined;
        }
    }

    initializecometd() {
        if (this.libInitialized) {
            return;
        }

        this.libInitialized = true;
        var cometdlib = new window.org.cometd.CometD();
        cometdlib.configure({
            url: window.location.protocol + '//' + window.location.hostname + '/cometd/54.0/',
            requestHeaders: { Authorization: 'OAuth ' + this.sessionId },
            appendMessageTypeToURL: false,
            logLevel: 'info'
        });
        cometdlib.websocketEnabled = false;

        cometdlib.handshake((status) => {
            if (status.successful) {
                cometdlib.subscribe(this.eventChannel, (message) => {
                    let msg = message.data.payload;
                    if (msg[this.fieldName('User_ID__c')].substring(0, 15) === this.userId.substring(0, 15)) {
                        if (msg[this.fieldName('Show_Toast__c')]) {
                            this.showToast(msg);
                        }
                        this.handleEventAction(msg);    
                    }
                });
            } else {
                console.error('Error in handshaking: ' + JSON.stringify(status));
            }
        });
    }

    get eventChannel() {
        return `/event/${this.namespace}${this.eventChannelName}`;
    }

	get fieldRelatedRecordId() {
        return this.fieldName('Related_Record_ID__c');
    }

    get fieldMessage() {
        return this.fieldName('Message__c');
    }

    fieldName(field) {
        return `${this.namespace}${field}`;
    }

    handleEventAction(msg) {
        switch (msg[this.fieldName('Action__c')]) {
            case 'Create':
                msg.style = this.getMessageStyle(msg[this.fieldName('Toast_Variant__c')]);
                this.messages.push(msg);
                this.hasMessage = true;
                break;
            case 'Update':
                let hasExisting = false;
                for (let i = 0; i < this.messages.length; i++) {
                    if (this.messages[i][this.fieldName('Related_Record_ID__c')] == msg[this.fieldName('Related_Record_ID__c')]) {
                        this.messages[i][this.fieldName('Message__c')] = msg[this.fieldName('Message__c')];
                        hasExisting = true;
                    }
                }
                if (!hasExisting) {
                    msg.style = this.getMessageStyle(msg[this.fieldName('Toast_Variant__c')]);
                    this.messages.push(msg);
                    this.hasMessage = true;
                }
                break;
            case 'Delete':
                for (let i = 0; i < this.messages.length; i++) {
                    if (this.messages[i][this.fieldName('Related_Record_ID__c')] == msg[this.fieldName('Related_Record_ID__c')]) {
                        this.messages.splice(i, 1);
                    }
                }
                this.hasMessage = this.messages.length > 0 ? true : false;
                break;
            case 'Toast Only':
                break;
        }
    }

    showToast(msg) {
        let toastVariant = msg[this.fieldName('Toast_Variant__c')] != null ? msg[this.fieldName('Toast_Variant__c')] : 'info';
        let toastTitle = msg[this.fieldName('Toast_Title__c')] != null ? msg[this.fieldName('Toast_Title__c')] : 'Alert';
        let toastMessage = msg[this.fieldName('Toast_Message__c')] != null ? msg[this.fieldName('Toast_Message__c')] : '';
        let toastMode = msg[this.fieldName('Toast_Mode__c')] != null ? msg[this.fieldName('Toast_Mode__c')] : 'dismissible';    
        const toastEvent = new ShowToastEvent({
            title: toastTitle,
            message: toastMessage,
            variant: toastVariant,
            mode: toastMode
        });
        this.dispatchEvent(toastEvent);
    }

    getMessageStyle(toastVariant) {
        var style = '';
        switch (toastVariant) {
            case 'success':
                style = 'slds-var-m-around_large slds-text-heading_small';
                break;
            case 'error':
                style = 'slds-var-m-around_large slds-text-color_error slds-text-heading_small';
                break;
            case 'warning':
                style = 'slds-var-m-around_large slds-text-color_error slds-text-heading_small';
                break;
            case 'info':
                style = 'slds-var-m-around_large slds-text-heading_small';
                break;
            default:
                style = 'slds-var-m-around_large slds-text-heading_small';
        }
        return style;
    }

    handleToggleDetails() {
        this.showDetails = !this.showDetails;
        this.toggleDetailsLabel = this.showDetails ? 'Hide' : 'Show';
    }

    handleTogglePopover() {
        this.showPopover = !this.showPopover;
    }
    
}
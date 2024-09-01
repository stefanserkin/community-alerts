/*
 * MIT License
 * Copyright (c) 2024 SerkinSolutions
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
                    const msg = this.processMessage(message.data.payload);
                    if (msg.userId.substring(0, 15) === this.userId.substring(0, 15)) {
                        if (msg.showToast) {
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

    processMessage(message) {
        return {
            action: message[this.fieldName('Action__c')],
            userId: message[this.fieldName('User_ID__c')],
            relatedRecordId: message[this.fieldName('Related_Record_ID__c')],
            showToast: message[this.fieldName('Show_Toast__c')],
            toastTitle: message[this.fieldName('Toast_Title__c')],
            toastMessage: message[this.fieldName('Toast_Message__c')],
            message: message[this.fieldName('Message__c')],
            toastVariant: message[this.fieldName('Toast_Variant__c')],
            toastMode: message[this.fieldName('Toast_Mode__c')],
            style: this.getMessageStyle(message[this.fieldName('Toast_Variant__c')])
        };
    }

    fieldName(field) {
        return `${this.namespace}${field}`;
    }

    get eventChannel() {
        return `/event/${this.namespace}${this.eventChannelName}`;
    }

    handleEventAction(msg) {
        const action = msg.action.toLowerCase();

        switch (action) {
            case 'create':
                this.messages.push(msg);
                this.hasMessage = true;
                break;
            case 'update':
                let updated = false;
                this.messages.forEach((message) => {
                    if (message.relatedRecordId === msg.relatedRecordId) {
                        message.message = msg.message;
                        updated = true;
                    }
                });
                if (!updated) {
                    this.messages.push(msg);
                    this.hasMessage = true;
                }
                break;
            case 'delete':
                this.messages = this.messages.filter(message => message.relatedRecordId !== msg.relatedRecordId);
                this.hasMessage = this.messages.length > 0;
                break;
            case 'toast only':
                break;
        }
    }

    showToast(msg) {
        const toastEvent = new ShowToastEvent({
            title: msg.toastTitle != null ? msg.toastTitle : 'Alert',
            message: msg.toastMessage != null ? msg.toastMessage : '',
            variant: msg.toastVariant != null ? msg.toastVariant : 'info',
            mode: msg.toastMode != null ? msg.toastMode : 'dismissible'
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

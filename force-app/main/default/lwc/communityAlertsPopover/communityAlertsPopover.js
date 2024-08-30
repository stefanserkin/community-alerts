import { LightningElement, api } from 'lwc';

export default class CommunityAlertsPopover extends LightningElement {
    @api messages = [];
	@api header;

	handleCloseEvent() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
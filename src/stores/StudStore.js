import {EventEmitter} from 'events';

class StudStore extends EventEmitter{
	constructor(){
		super();
		this.studData = null;
	}
	updateStudList(){
		
         this.emit("change");  
		}
	
		getStudsList(){
			return this.studData;
		}
		
		
}
const studStore = new StudStore;
export default studStore;
import React,{useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app')
const DeletePostModal =(props)=>{

    return(
        <div>
        <Modal 
           isOpen={!!props.isOpen}
           onRequestClose={props.isClose}
           contentLabel="Delete Post"
           className="modal"
        >
          <>
            <h3 className="modal__title">Delete Post</h3>
            <p className="modal__body">Are you sure want to delete post ?</p>
            <div className="button-group">
              <button className="button" onClick={props.onRemove}>Delete</button>
              <button onClick={props.isClose} className="button">Cancel</button>  
            </div>
                     
          </>
          
        </Modal>
        
        </div>
    );
}
export default DeletePostModal;
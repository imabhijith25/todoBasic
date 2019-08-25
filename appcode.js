
const items = document.getElementById('items');

const completedItems = document.getElementById('completed');

function renderItems(element){
    let li = document.createElement('li');
    li.classList.add('bold');
    let expandButton = document.createElement('div');
    expandButton.classList.add('expander')
    let delButton = document.createElement('button');
    let editButton  = document.createElement('button');
    let completeButton = document.createElement('button');


    if(element.data().completed == 'false'){
        completeButton.innerText = 'Complete';
    }
    else{
        completeButton.innerText = 'Completed';
    }
    
    completeButton.classList.add('btn-primary')
    delButton.textContent = 'delete'
    editButton.textContent = 'edit'
    


    



    li.setAttribute('id',element.id)
    li.setAttribute('open',false);
    
    li.textContent = element.data().title + " at "+ element.data().time;
    li.appendChild(expandButton);
    li.appendChild(editButton);
    li.appendChild(delButton);
    li.appendChild(completeButton)
    items.appendChild(li)



    li.addEventListener('click',e=>{
        let id = e.target.parentElement.getAttribute('id');
        
            console.log(id);
            
            
            if(li.getAttribute('open')== 'false'){
                console.log('sd');
                expandButton.innerText = element.data().description
                li.setAttribute('open',true);

            }
            else if(li.getAttribute('open')== 'true'){
                console.log('sdsd');
                expandButton.innerText = ""
                li.setAttribute('open',false);
              

            }
            

        
    
    })
    delButton.addEventListener('click',(e)=>{
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('id');
        console.log(id);
        db.collection('items').doc(id).delete();
    })

    completeButton.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('id');
        completeButton.innerText = "completed"
        db.collection('items').doc(id).update({
            completed:'true'
        })
        
    })
    editButton.addEventListener('click',(e)=>{
        document.getElementById('id01').style.display='block'
        let id = e.target.parentElement.getAttribute('id');
        updateform = document.getElementById('modalval');
        console.log(id);
        updateform.addEventListener('submit',(el,eid = id)=>{
           el.preventDefault()
            console.log(id)
            console.log(updateform.updateName.value)
            db.collection('items').doc(id).update({
                
                title:updateform.updateName.value,
                description:updateform.updateDescription.value,

                time:updateform.updateTime.value,
                completed: 'false'
               

            })
            
      
        })

  

    })
    

    




    
}

const form = document.getElementById('todosubmit');
form.addEventListener('submit',e=>{
    e.preventDefault();
    console.log(form.title.value);
    console.log(form.description.value);
    console.log(form.time.value);


    db.collection('items').add({
        title:form.title.value,
        description :form.description.value,
        time : form.time.value,
        completed: 'false'

    })
})



db.collection('items').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges()
    console.log(changes)
    changes.forEach(change=>{
        if(change.type == 'added'){
            renderItems(change.doc)
        
        }
        else if(change.type == 'removed'){
            let lisel = document.querySelector('[id='+change.doc.id+']');
            items.removeChild(lisel);
        }

    })
})




/*db.collection('items').get().then((snapshot)=>{
    snapshot.docs.forEach(element => {
        console.log(element.data().title);
        renderItems(element);
        
    });
})
*/
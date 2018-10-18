import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../templates.service';
import { FormBuilder, FormGroup } from '@angular/forms';
// Jquery declaration
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  lastTarget: any;
  title = 'home';
  template: any;
  templateSending = false;
  postText: string = "";
  errorMessage: string;
  postSaved : boolean = false;
  currentElem: any;
  currentTargetParents: any;
  btnExist = false;
  private _formBuilder: FormBuilder;
  savePostForm: FormGroup;
  activeHoverEvent;
  saveBtnPublic: any;

  constructor(private _templatesService: TemplatesService, formBuilder: FormBuilder) { 
    this._formBuilder = formBuilder;    
    this.savePostForm = this._formBuilder.group({ })
  }

  ngOnInit() {
    $( document ).ready(()=> {
      this.eventBinder();
    });

    this.activeHoverEvent = false;

    this._templatesService.getTemplate(this.title)
      .subscribe(
        (res) => {
          if(res){
            this.template = res.template;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  eventBinder(){

    let _self = this;
    this.btnExist = true;
    let btnEdit = document.createElement('button');
    let textNodeEdit = document.createTextNode('Edit');
    let btnSave = document.createElement('button');
    this.saveBtnPublic = btnSave;
    let textNodeSave = document.createTextNode('Save');

    $('section.click2edit').hover(function(event){
      
      // _self.save(this.lastTarget);
      if(this.lastTarget){
        // $(event.target).summernote('destroy');
      }
    
      let left = $(this).width() - 100;
      // let top =$(this).height()/2;
      let position = $(this).position();
      // let left = position.left;
      let top = position.top;
      btnEdit.appendChild(textNodeEdit);
      btnSave.appendChild(textNodeSave);
    
      btnEdit.setAttribute('style', `position:absolute;left:${left}px;top:${top + 5}px;z-index:1`);
      btnSave.setAttribute('style', `position:absolute;left:${left + 50}px;top:${top + 5}px;z-index:1`);
      // this.saveBtnPublick = btnSave;
      $(btnEdit).insertBefore($(this));
      $(btnSave).insertBefore($(this));
      // $(this).append(btnSave);

      $(btnSave).off('click').on('click', (event) =>{
        _self.save($(this));
      });

      $(btnEdit).off('click').on('click', (event) =>{
        $(this.saveBtnPublick).remove();
        if(this.lastTarget){
          $(this.lastTarget).summernote('destroy');
        }else{
          if(event.currentTarget.classList.contains('click2edit')){
            $(event.currentTarget).summernote('destroy');
          }else{
            $(this.lastTarget).summernote('destroy');
          }
        }
        _self.edit($(this));
      });
    if(event.currentTarget.classList.contains('click2edit')){
      this.lastTarget = event.currentTarget;
    }
    });
  };

  edit(elem){
    let _self = this;
    $(this.lastTarget).removeChild
    this.lastTarget = elem;
    let btnSave = document.createElement('button');
    let textNodeSave = document.createTextNode('Save');
    // $('.click2edit').summernote({focus: true});
    let left = $(elem).width() - 100;
    // let top =$(this).height()/2;
    let position = $(elem).position();
    // let left = position.left;
    let top = position.top;
    btnSave.appendChild(textNodeSave);
    
    btnSave.setAttribute('style', `position:absolute;left:${left + 50}px;top:${top + 5}px;z-index:1`);

    $(btnSave).insertBefore($(elem));
    // $(this).append(btnSave);

    $(btnSave).off('click').on('click', (event) =>{
      debugger
      _self.save($(elem));
    });
    
    $(elem).summernote();
  }

  save(elem){
    this.currentElem = elem;
    let markup = $(elem).summernote('code');
    debugger
    $(elem).summernote('destroy');
  }
  // on submit method
  savePost(event) {
    let text = $('#summernote').summernote('code');
    console.log(text);
    if (text != null && text != '') {
      this.postText = text;
      this.postSaved = true;
      setTimeout(() => this.postSaved = false, 2000);
    }
    else {
      console.error("posts empty");
      this.postSaved = false;
    }
  }

  editElement(event, elem){
    if(!this.activeHoverEvent){
      this.activeHoverEvent = true;
    }

    let target = event.target
    let targetParents = $(target).parents();
    if(event.toElement.classList.contains('click2edit')){
      let classList = event.toElement.classList;
    }
   
    if($(event.fromElement).parents('.click2edit')){

      let classList2 = $(event.fromElement).parents();
      

    }
    // if(this.currentTargetParents !== targetParents){
      if(!target.classList.contains('body_container')){
        // this.currentTarget = $(target).parents();
        // this.currentTargetParents = targetParents;
        let targContext = $(target).parents('.click2edit');

        if(targContext[0]){
          if(targContext[0].classList.contains('click2edit')){
            // debugger
            if (!this.btnExist){
              // if($(target).parents('.click2edit')[0]){
                this.btnExist = true;
                let btnEdit = document.createElement('button');
                let textNode = document.createTextNode('Edit');
                // let parentBlock = $(target).parents('.click2edit')[0];
                let parentBlock = targContext[0];
                $(btnEdit).on('click', (event) =>{
                  debugger
                  this.edit(targContext[0]);
                })
                // event.preventDe
                btnEdit.appendChild(textNode);
                
                // parentBlock[0].append(btnEdit)
                // $(this).append(btnEdit)
                parentBlock.append(btnEdit)
                // event.currentTarget.appendChild(btnEdit);
            
                // let left = parentBlock.width() - 100;
                // let top = parentBlock.height() - 100;
                let left = parentBlock.offsetWidth - 100;
                let top = parentBlock.offsetHeight - 100;
                btnEdit.setAttribute('style', `position:absolute;left:${left}px;top:${top}px`);
              }
            // }
          }
        } else if(targContext["context"].classList.contains('click2edit')){
          // debugger
        }
      }
    // }

      // event.target.parentElement.appendChild(btnEdit);
      // console.log(event.target.parentElement);
      // if (!this.btnExist){
      //   if($(target).parents('.click2edit')[0]){
      //     this.btnExist = true;
      //     let btnEdit = document.createElement('button');
      //     let textNode = document.createTextNode('Edit');
      //     let parentBlock = $(target).parents('.click2edit')[0];
      //     $(btnEdit).on('click', (event) =>{
      //       debugger
      //       this.edit(target);
      //     })
      //     // event.preventDe
      //     btnEdit.appendChild(textNode);
          
      //     // parentBlock[0].append(btnEdit)
      //     // $(this).append(btnEdit)
      //     parentBlock.append(btnEdit)
      //     // event.currentTarget.appendChild(btnEdit);
      
      //     // let left = parentBlock.width() - 100;
      //     // let top = parentBlock.height() - 100;
      //     let left = parentBlock.offsetWidth - 100;
      //     let top = parentBlock.offsetHeight - 100;
      //     btnEdit.setAttribute('style', `position:absolute;left:${left}px;top:${top}px`);
      //   }
      // }
    // }else if(this.currentTarget !== target){

    // }
   
    
    // let btnEdit = document.createElement('button');
    // let textNode = document.createTextNode('Edit');
    // btnEdit.appendChild(textNode);
    // if(!target.classList.contains('click2edit') && !target.classList.contains('body_container')){
    //   let parentBlock = $(target).parents('.click2edit')
    //   parentBlock[0].append(btnEdit)
    //   // event.currentTarget.appendChild(btnEdit);
  
    //   let left = parentBlock.width() - 100;
    //   let top = parentBlock.height() - 100;
    //   // let top = event.target.offsetTop + height/2;
    //   // let left = event.target.offsetLeft + width/2;
    //   btnEdit.setAttribute('style', `position:absolute;left:${left}px;top:${top}px`);
    // }else if(!target.classList.contains('body_container')){
    //   target.appendChild(btnEdit);
    //   // event.currentTarget.appendChild(btnEdit);
  
    //   let left = target.offsetWidth/2;
    //   let top = target.offsetHeight/2;
    //   // let top = event.target.offsetTop + height/2;
    //   // let left = event.target.offsetLeft + width/2;
    //   btnEdit.setAttribute('style', `position:absolute;left:${left}px;top:${top}px`);
    // }
 


    
//     let node = document.createTextNode('Edit')
//     let width = event.target.offsetWidth / 2;
//     let height = event.target.offsetHeight / 2;
//     let top = event.target.offsetTop + height/2;
//     let left = event.target.offsetLeft + width/2;
// if(event.target.classList.contains('section')){
//   if(event.target.id !== 'editElem'){
//     parent.appendChild(node);
//     parent.setAttribute('id', 'editElem');
//     // parent.setAttribute('style', `position:absolute;left:${left}px;top:${top}px`);
//     // event.target.appendChild(parent);
//     event.target.style.background = 'yellowgreen'
//     const children = event.relatedTarget.children
//     // if(children){
//     //       for(let child of children){
//     //         if(child.id === 'editElem'){
//     //           event.relatedTarget.removeChild(child)
//     //         }
//     //       }
//     //     }
//     // event.relatedTarget.removeChild(parent)
//     event.relatedTarget.background = '#fff'
//     // event.target.style.border = '1px solid #999';
//     // if(this.lastTarget && event.target !== this.lastTarget){
//     //   const children = this.lastTarget.children
//     //   if(children){
//     //     for(let child of children){
//     //       if(child.id === 'editElem'){
//     //         this.lastTarget.removeChild(child)
//     //       }
//     //     }
//     //   }else{
//     //     this.lastTarget.removeChild(parent)
//     //   }
      
//     //     // this.lastTarget.style.border = 'none'
//     // }
//     this.lastTarget = event.target;
//   }
// }
   
  }
  editInner(){
    this.save(this.currentElem)
    let body;
    let pageTitle = 'home';
    if(this.template){
      body= document.querySelector('#body');
    }else{
      body= document.querySelector('#default');
    }
   
    this._templatesService.sendTemplate(body.innerHTML, pageTitle).subscribe(
      (res) => {
        setTimeout(() => {
          this.templateSending = false;
        }, 1000)
      },
      (error) => {console.log(error)}
    )
  }
}

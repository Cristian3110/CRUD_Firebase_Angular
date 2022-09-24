import { Injectable } from '@angular/core'; 

//importando los módulos ara DB con firebase

import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) {   }

  // Métodos para el CRUD
  getPost(){
    return this.angularFirestore.collection('posts').snapshotChanges();
  }

  getPostById(id){
    return this.angularFirestore.collection('post').doc(id).valueChanges()
  }

  createPost(post: Post){
    return new Promise<any>((resolve, reject)=>{
      this.angularFirestore.collection('post').add(post).then((resp)=>{
        console.log(resp)
      },(error)=>{
        reject(error)
      })
    })
  }


  updatePost(post: Post, id){
    return this.angularFirestore.collection('post').doc(id).update({
      title: post.title,
      content: post.content,
      author: post.author
    });
  }

  deletePost(post){
    return this.angularFirestore.collection('post').doc(post.id).delete()
  }
}

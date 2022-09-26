import { Component, OnInit } from '@angular/core';

//importando el modelo
import { Post } from 'src/app/post.model';
//importando nuestro servicio
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  //inicializamos el arreglo de tipo Post
  Posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res) => {
      // console.log(res)
      this.Posts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post),
        };
      });
      console.log(this.Posts);
    });
  }

  deleteRow = (post) => this.postService.deletePost(post);
}

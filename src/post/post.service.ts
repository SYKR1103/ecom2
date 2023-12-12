import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
 

  constructor(
    @InjectRepository(Post)
    private postRepo : Repository<Post>
  ) {}

  async createPost(c:CreatePostDto, user:User) {
    const newPost = await this.postRepo.create({
      ...c,
     author : user
    })
    await this.postRepo.save(newPost)
    return newPost
  }

  


}

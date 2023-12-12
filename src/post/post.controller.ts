import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @UseGuards(JwtAuthGuard) //로그인한 사람만 아래를 할 수 있게
  @Post()
  
  async createPost(@Req() req:RequestWithUser,
  @Body() CreatePostDto:CreatePostDto) { 
    return await this.postService.createPost(CreatePostDto, req.user)

   }
 




}

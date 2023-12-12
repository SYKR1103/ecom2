import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Role } from './role.enum';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/post/entities/post.entity';
import { Provider } from './provider.enum';
import * as gravatar from 'gravatar'

@Entity()
export class User extends BaseEntity {
  @Column()
  public nickname: string;

  @Column({nullable:true})
  public password: string;

  @Column({ unique: true })
  public email: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @Column({
    type : 'enum',
    enum : Provider,
    default : Provider.Local
  }) public provider : Provider

  @Column({nullable:true})
  public photoImage ?: string

  @BeforeInsert()
  async hashedPassword(): Promise<void> {
    try {
      
      if (this.provider !== Provider.Local) {
        return
      } else {

        this.photoImage = gravatar.url(this.email, {
          s : '200',
          r : 'pg',
          d : 'mm',
          protocal : 'https'
        })
        const saltValue = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltValue);

      }

    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const isMatchedPassword = await bcrypt.compare(aPassword, this.password);
      return isMatchedPassword;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @OneToMany(()=>Post, (post:Post)=> post.author)
  public posts? : Post[]



}

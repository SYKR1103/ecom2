import { BaseEntity } from "src/common/base.entity"
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToOne } from "typeorm"





@Entity()
export class Post extends BaseEntity{

    @Column()
    public title : string;


    @Column()
    public desc : string;


    @ManyToOne(()=>User, (author:User)=> author.posts)
    public author:User

}

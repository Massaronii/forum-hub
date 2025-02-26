import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface AnswerProps {
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    content: string
    createAt: Date
    updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    get authorId(){
        return this.props.content
    }

    get content(){
        return this.props.content
    }

    get questionId(){
        return this.props.content
    }
    
    get createAt(){
        return this.props.content
    }

    get updateAt(){
        return this.props.content
    }

    get excerpt(){
        return this.content
        .substring(0, 120)
        .trimEnd()
        .concat('...')
    }

    private touch(){
       this.props.updateAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    static create(
        props: Optional<AnswerProps,
        'createAt'>, id?: UniqueEntityId
        ) {

        const answer = new Answer({
            ...props,
            createdAt: new Date(),
        }, id)

        return answer
    }
}
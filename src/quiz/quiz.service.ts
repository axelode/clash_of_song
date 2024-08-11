import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  async findAll() {
    console.log("triged");
    
    const dataQuiz = await this.prismaService.quiz.findMany({
      include: {
        answers: true,
        userAnswer: true
      }
    });

    return dataQuiz.sort(() => Math.random() - 0.5);
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}

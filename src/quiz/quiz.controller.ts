import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // @Post()
  // create(@Body() createQuizDto: CreateQuizDto) {
  //   return this.quizService.create(createQuizDto);
  // }

  @Get('/all')
  findAll() {
    return this.quizService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
  //   return this.quizService.update(+id, updateQuizDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.quizService.remove(+id);
  // }
}

import {
  IsDate,
  IsInt,
  IsString,
  Max,
  Min,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(1, { message: 'Title must have at least 1 character' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @MinLength(1, { message: 'Content must have at least 1 character' })
  @MaxLength(500, { message: 'Content cannot exceed 500 characters' })
  content: string;

  @Type(() => Date)
  @IsDate({ message: 'Scheduled date must be a valid date' })
  scheduledDate: Date;

  @IsInt({ message: 'Priority must be an integer' })
  @Min(1, { message: 'Minimum priority is 1' })
  @Max(10, { message: 'Maximum priority is 10' })
  priority: number;
}

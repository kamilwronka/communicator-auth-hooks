import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: { create: jest.fn() } }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockUsersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call create method', () => {
      controller.createUser({
        user: { user_id: 'userid', email: 'email@email.com' },
      });

      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });
});

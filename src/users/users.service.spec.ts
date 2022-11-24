import { HttpService } from '@nestjs/axios';
import { BadGatewayException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { of, throwError } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockHttpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: { post: jest.fn(() => of({ data: {} })) },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockHttpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call users service with user data', async () => {
      const response = await service.create({
        email: 'email@email.com',
        username: 'test',
      });

      expect(response).toEqual({});
      expect(mockHttpService.post).toHaveBeenCalled();
    });

    it('should throw bad gateway error if call to users service fails', async () => {
      mockHttpService.post = jest.fn(() =>
        throwError(() => new AxiosError(null, '500')),
      );

      expect(
        service.create({
          email: 'email@email.com',
          username: 'test',
        }),
      ).rejects.toThrow(BadGatewayException);
    });
  });
});

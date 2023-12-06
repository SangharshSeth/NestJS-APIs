import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

describe('UsersService', () => {
  const userModelMock = {
    create: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  describe('Create', () => {
    it('it Should create a user', async () => {
      const mockUser: User = {
        name: 'admin',
        age: 25,
        isPremium: false,
      };

      const expectedUser = {
        _id: '6570e011203b6f5f8c4f4009',
        ...mockUser,
      };

      jest
        .spyOn(userModelMock, 'create')
        .mockImplementationOnce(() => Promise.resolve(expectedUser));

      const result = await service.create(mockUser);

      expect(result).toEqual(expectedUser);
    });
  });
});

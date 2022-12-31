import {
  Injectable
} from "@nestjs/common";
import { Backlist } from "./backlist.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BacklistService {
  constructor(
    @InjectRepository(Backlist)
    private backlistRepository: Repository<Backlist>
  ) {}
  
  async getByUserId (userId: number) {
    return await this.backlistRepository.find({ 
        where: {
          userId,
          status: 1
        }
     });
  }

  async getOneByToken (userId: number, acToken:string) {
    return await this.backlistRepository.findOneBy({ 
        userId,
        acToken,
        status: 0
     });
  }

 async create(...data: any): Promise<void>{
  let firstItem = data.find(x=>x!==undefined);
  const createdBacklist = await this.backlistRepository.create(firstItem);
  await this.backlistRepository.save(createdBacklist);
 }

 async update(...data: any): Promise<void> {
  let firstItem = data.find(x=>x!==undefined);
  const { userId, acToken } = firstItem;
  let foundBacklist = await this.backlistRepository.findOneBy({ 
    userId,
    acToken,
    status: 1
  });

  if (foundBacklist) {
    foundBacklist = {
      ...foundBacklist,
      ...firstItem,
      updatedAt: new Date(),
      
    };
    
    await this.backlistRepository.save(foundBacklist);
  }
 }
}

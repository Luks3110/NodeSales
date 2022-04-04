import Customer from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
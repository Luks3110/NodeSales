import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class ShowProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default ShowProductService;

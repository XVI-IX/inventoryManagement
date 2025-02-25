import {
  BadRequestException,
  ConflictException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ISuppliersRepository } from '../../domain/repositories/suppliers.repository';
import { Repository } from 'typeorm';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import {
  IFindOneOptions,
  IFindOptions,
} from '@app/lib/domain/adapters/query.interface';

export class SupplierRepository implements ISuppliersRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private readonly supplierRepository: Repository<Suppliers>,
  ) {
    this.logger = new Logger(SupplierRepository.name);
  }

  async save(entity: Partial<Suppliers>): Promise<Suppliers> {
    try {
      const supplierExists = await this.supplierRepository.find({
        where: {
          name: entity.name,
          email: entity.email,
        },
      });

      if (supplierExists) {
        throw new ConflictException('Supplier already exists');
      }

      const supplier = await this.supplierRepository.save(entity);

      if (!supplier) {
        throw new ConflictException('Supplier could not be saved');
      }

      return supplier;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(
    condition: Partial<Suppliers>,
    entity: Partial<Suppliers>,
  ): Promise<Suppliers> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: condition,
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be retrieved');
      }

      return await this.supplierRepository.save({
        ...supplier,
        ...entity,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async find(
    condition: Partial<Suppliers>,
    options?: IFindOptions<Suppliers>,
  ): Promise<Suppliers[]> {
    try {
      const suppliers = await this.supplierRepository.find({
        where: condition,
        skip: options.skip,
        select: options.select,
        take: options.take,
        order: options.order,
      });

      if (!suppliers) {
        throw new BadRequestException('Suppliers could not be retrieved');
      }

      return suppliers;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(
    condition: Partial<Suppliers>,
    options: IFindOneOptions<Suppliers>,
  ): Promise<Suppliers> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: condition,
        relations: {
          products: true,
        },
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be retrieved');
      }

      return supplier;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(condition: Partial<Suppliers>): Promise<boolean> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: condition,
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be retrieved');
      }

      await this.supplierRepository.delete(supplier.id);

      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

type OrderDirection = 'ASC' | 'DESC';

/**
 * @name IFindOptions
 * @description Interface for find options
 *
 * @template T
 * @property {Partial<Record<keyof T, boolean>>} select
 * @property {Partial<T>} where
 * @property {Partial<Record<keyof T, OrderDirection>>} order
 * @property {boolean} withDeleted
 * @property {number} skip
 * @property {number} take
 *
 * @example
 * const options: IFindOptions<Users> = {
 *  select: {
 *    id: true,
 *    userName: true,
 *    email: true,
 *   },
 *  where: {
 *    status: 'active',
 *  },
 *  order: {
 *  id: 'ASC',
 *  },
 *  withDeleted: false,
 *  skip: 0,
 *  take: 10,
 *  };
 */
export interface IFindOptions<T> {
  select?: Partial<Record<keyof T, boolean>>;
  where?: Partial<T>;
  order?: Partial<Record<keyof T, OrderDirection>>;
  withDeleted?: boolean;
  skip?: number;
  take?: number;
}

/**
 * @name IFindOneOptions
 * @description Interface for find one options
 *
 * @template T
 * @property {Partial<T>} where
 *
 * @example
 * const options: IFindOneOptions<Users> = {
 * where: {
 * id: '1234-5678-9012-3456',
 * },
 */
export interface IFindOneOptions<T> {
  where?: Partial<T>;
}

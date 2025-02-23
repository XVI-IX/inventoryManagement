import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleInput {
  name: string;
  permissions: {
    createUsers: boolean;
    editUsers: boolean;
    deleteUsers: boolean;
    activateUsers: boolean;
    viewUsers: boolean;
    assignRoles: boolean;
    resetPasswords: boolean;
    createProducts: boolean;
    editProducts: boolean;
    deleteProducts: boolean;
    viewProducts: boolean;
    manageStockLevels: boolean;
    setLowStockThreshold: boolean;
    viewInventoryAuditLog: boolean;
    createOrders: boolean;
    editOrders: boolean;
    deleteOrders: boolean;
    viewOrders: boolean;
    fulfillOrders: boolean;
    cancelOrders: boolean;
    viewSalesReports: boolean;
    viewInventoryReports: boolean;
    viewFinancialReports: boolean;
    exportReports: boolean;
    addSuppliers: boolean;
    editSuppliers: boolean;
    deleteSuppliers: boolean;
    viewSuppliers: boolean;
    createPurchaseOrders: boolean;
    editPurchaseOrders: boolean;
    deletePurchaseOrders: boolean;
    approvePurchaseOrders: boolean;
    receivePurchaseOrders: boolean;
    manageSystemSettings: boolean;
    configureNotifications: boolean;
  };
  // permissions: string[]
}

export class CreatePermissionInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

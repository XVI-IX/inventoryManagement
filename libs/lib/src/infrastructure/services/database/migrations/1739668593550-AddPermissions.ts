import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissions1739668593550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO permissions (id, name, description) VALUES 
            (UUID(), 'createUsers', 'Permission to create users'),
            (UUID(), 'editUsers', 'Permission to edit users'),
            (UUID(), 'deleteUsers', 'Permission to delete users'),
            (UUID(), 'activateUsers', 'Permission to activate users'),
            (UUID(), 'viewUsers', 'Permission to view users'),
            (UUID(), 'assignRoles', 'Permission to assign roles'),
            (UUID(), 'resetPasswords', 'Permission to reset passwords'),
            (UUID(), 'createProducts', 'Permission to create products'),
            (UUID(), 'editProducts', 'Permission to edit products'),
            (UUID(), 'deleteProducts', 'Permission to delete products'),
            (UUID(), 'viewProducts', 'Permission to view products'),
            (UUID(), 'manageStockLevels', 'Permission to manage stock levels'),
            (UUID(), 'setLowStockThreshold', 'Permission to set low stock threshold'),
            (UUID(), 'viewInventoryAuditLog', 'Permission to view inventory audit log'),
            (UUID(), 'createOrders', 'Permission to create orders'),
            (UUID(), 'editOrders', 'Permission to edit orders'),
            (UUID(), 'deleteOrders', 'Permission to delete orders'),
            (UUID(), 'viewOrders', 'Permission to view orders'),
            (UUID(), 'fulfillOrders', 'Permission to fulfill orders'),
            (UUID(), 'cancelOrders', 'Permission to cancel orders'),
            (UUID(), 'viewSalesReports', 'Permission to view sales reports'),
            (UUID(), 'viewInventoryReports', 'Permission to view inventory reports'),
            (UUID(), 'viewFinancialReports', 'Permission to view financial reports'),
            (UUID(), 'exportReports', 'Permission to export reports'),
            (UUID(), 'addSuppliers', 'Permission to add suppliers'),
            (UUID(), 'editSuppliers', 'Permission to edit suppliers'),
            (UUID(), 'deleteSuppliers', 'Permission to delete suppliers'),
            (UUID(), 'viewSuppliers', 'Permission to view suppliers'),
            (UUID(), 'createPurchaseOrders', 'Permission to create purchase orders'),
            (UUID(), 'editPurchaseOrders', 'Permission to edit purchase orders'),
            (UUID(), 'deletePurchaseOrders', 'Permission to delete purchase orders'),
            (UUID(), 'approvePurchaseOrders', 'Permission to approve purchase orders'),
            (UUID(), 'receivePurchaseOrders', 'Permission to receive purchase orders'),
            (UUID(), 'manageSystemSettings', 'Permission to manage system settings'),
            (UUID(), 'configureNotifications', 'Permission to configure notifications');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM permissions WHERE name IN (
                createUsers,
                editUsers,
                deleteUsers,
                activateUsers,
                viewUsers,
                assignRoles,
                resetPasswords,
                createProducts,
                editProducts,
                deleteProducts,
                viewProducts,
                manageStockLevels,
                setLowStockThreshold,
                viewInventoryAuditLog,
                createOrders,
                editOrders,
                deleteOrders,
                viewOrders,
                fulfillOrders,
                cancelOrders,
                viewSalesReports,
                viewInventoryReports,
                viewFinancialReports,
                exportReports,
                addSuppliers,
                editSuppliers,
                deleteSuppliers,
                viewSuppliers,
                createPurchaseOrders,
                editPurchaseOrders,
                deletePurchaseOrders,
                approvePurchaseOrders,
                receivePurchaseOrders,
                manageSystemSettings,
                configureNotifications
            )
        `);
  }
}

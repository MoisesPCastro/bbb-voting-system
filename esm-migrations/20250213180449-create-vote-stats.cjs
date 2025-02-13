module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoteStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      candidate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('VoteStats');
  }
};

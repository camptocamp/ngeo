import ngeoGridConfig from 'ngeo/grid/Config.js';

describe('ngeo.grid.component', () => {

  let gridController;
  let $scope;
  let $rootScope;

  beforeEach(angular.mock.inject((_$controller_, _$rootScope_) => {
    const $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    const gridConfigData = [
      {
        'name': 'row_1',
        'display_name': 'Row 1',
        'type': 12,
        'timestamp': '2010-11-09T22:56:26Z'
      },
      {
        'name': 'row_2',
        'display_name': 'Row 2',
        'type': 121,
        'timestamp': '2010-11-07T22:56:26Z'
      },
      {
        'name': 'row_3',
        'display_name': 'Row 3',
        'type': 7,
        'timestamp': '2010-11-03T22:56:26Z'
      },
      {
        'name': 'row_4',
        'display_name': 'Row 3',
        'type': 7,
        'timestamp': '2010-11-03T22:56:26Z'
      },
      {
        'name': 'row_4',
        'display_name': 'Row 4',
        'type': 5,
        'timestamp': '2010-11-19T22:56:26Z'
      },
      {
        'name': 'row_5',
        'display_name': 'Row 5',
        'type': 23,
        'timestamp': '2010-11-23T22:56:26Z'
      }
    ];
    const columnDefs = [
      {name: 'name'},
      {name: 'display_name'},
      {name: 'timestamp'},
      {name: 'type'}
    ];

    const data = {
      configuration: new ngeoGridConfig(gridConfigData, columnDefs)
    };
    gridController = $controller(
      'ngeoGridController', {$scope}, data);
  }));

  describe('#sort', () => {

    it('sorts a column', () => {
      const data = gridController.configuration.data;

      // sort asc. by 'type'
      gridController.sort('type');
      expect(data[0]['name']).toBe('row_4');

      // sort desc. by 'type'
      gridController.sort('type');
      expect(data[0]['name']).toBe('row_2');
    });

  });

  describe('#selectRow_', () => {

    it('selects a row', () => {
      const data = gridController.configuration.data;

      const firstRow = data[0];
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);

      gridController.clickRow_(firstRow, false, false);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);

      gridController.clickRow_(firstRow, false, false);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);
    });

    it('selects a different row', () => {
      const data = gridController.configuration.data;

      const firstRow = data[0];
      const sndRow = data[1];
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(false);

      gridController.clickRow_(firstRow, false, false);
      gridController.clickRow_(sndRow, false, false);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(true);
    });

    it('selects multiple rows', () => {
      const data = gridController.configuration.data;

      const firstRow = data[0];
      const sndRow = data[1];
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(false);

      // select both rows
      gridController.clickRow_(firstRow, false, true);
      gridController.clickRow_(sndRow, false, true);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(true);

      // unselect the 2nd row
      gridController.clickRow_(sndRow, false, true);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(false);

      // select the 2nd again
      gridController.clickRow_(sndRow, false, true);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(true);

      // a normal click clears both
      gridController.clickRow_(sndRow, false, false);
      expect(gridController.configuration.isRowSelected(firstRow)).toBe(false);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(false);
    });

    it('selects a range of rows (continuous down)', () => {
      const data = gridController.configuration.data;

      const firstRow = data[0];
      const sndRow = data[1];
      const thirdRow = data[2];

      // select first row
      gridController.clickRow_(firstRow, false, false);

      // then click on the 3rd row with SHIFT pressed
      gridController.clickRow_(thirdRow, true, false);

      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(thirdRow)).toBe(true);
    });

    it('selects a range of rows (continuous up)', () => {
      const data = gridController.configuration.data;

      const firstRow = data[0];
      const sndRow = data[1];
      const thirdRow = data[2];

      // select third row
      gridController.clickRow_(thirdRow, false, false);

      // then click on the first row with SHIFT pressed
      gridController.clickRow_(firstRow, true, false);

      expect(gridController.configuration.isRowSelected(firstRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(sndRow)).toBe(true);
      expect(gridController.configuration.isRowSelected(thirdRow)).toBe(true);
    });

    it('selects a range of rows (no previous selection)', () => {
      const data = gridController.configuration.data;

      // SHIFT click on row 1 without previous selection
      gridController.clickRow_(data[0], true, false);

      expect(gridController.configuration.isRowSelected(data[0])).toBe(true);
      expect(gridController.configuration.isRowSelected(data[1])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[2])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[3])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[4])).toBe(false);
    });

    it('selects a range of rows (on already selected row)', () => {
      const data = gridController.configuration.data;

      // select row 1
      gridController.clickRow_(data[0], false, false);

      // SHIFT click again on row 1
      gridController.clickRow_(data[0], true, false);

      expect(gridController.configuration.isRowSelected(data[0])).toBe(true);
      expect(gridController.configuration.isRowSelected(data[1])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[2])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[3])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[4])).toBe(false);
    });

    it('selects a range of rows (already selected rows, up)', () => {
      /**
       * Row 1 and 3 are selected:
       * [x] 1
       * [ ] 2
       * [x] 3
       * [ ] 4
       * [ ] 5
       *
       * A click on row 5 should select row 4 and 5:
       * [x] 1
       * [ ] 2
       * [x] 3
       * [x] 4
       * [x] 5
       */
      const data = gridController.configuration.data;

      const row1 = data[0];
      const row2 = data[1];
      const row3 = data[2];
      const row4 = data[3];
      const row5 = data[4];

      // select row 1 and 3
      gridController.clickRow_(row1, false, false);
      gridController.clickRow_(row3, false, true);

      // then click on row 5 with SHIFT pressed
      gridController.clickRow_(row5, true, false);

      expect(gridController.configuration.isRowSelected(row1)).toBe(true);
      expect(gridController.configuration.isRowSelected(row2)).toBe(false);
      expect(gridController.configuration.isRowSelected(row3)).toBe(true);
      expect(gridController.configuration.isRowSelected(row4)).toBe(true);
      expect(gridController.configuration.isRowSelected(row5)).toBe(true);
    });

    it('selects a range of rows (already selected rows, down)', () => {
      /**
       * Row 3 and 5 are selected:
       * [ ] 1
       * [ ] 2
       * [x] 3
       * [ ] 4
       * [x] 5
       *
       * A click on row 1 should select row 1 and 2:
       * [x] 1
       * [x] 2
       * [x] 3
       * [ ] 4
       * [x] 5
       */
      const data = gridController.configuration.data;

      const row1 = data[0];
      const row2 = data[1];
      const row3 = data[2];
      const row4 = data[3];
      const row5 = data[4];

      // select row 3 and 5
      gridController.clickRow_(row3, false, false);
      gridController.clickRow_(row5, false, true);

      // then click on row 1 with SHIFT pressed
      gridController.clickRow_(row1, true, false);

      expect(gridController.configuration.isRowSelected(row1)).toBe(true);
      expect(gridController.configuration.isRowSelected(row2)).toBe(true);
      expect(gridController.configuration.isRowSelected(row3)).toBe(true);
      expect(gridController.configuration.isRowSelected(row4)).toBe(false);
      expect(gridController.configuration.isRowSelected(row5)).toBe(true);
    });
  });

  describe('#selectAll', () => {

    it('selects and unselects all rows', () => {
      const data = gridController.configuration.data;

      gridController.configuration.selectAll();
      data.forEach((row) => {
        expect(gridController.configuration.isRowSelected(row)).toBe(true);
      });

      gridController.configuration.unselectAll();
      data.forEach((row) => {
        expect(gridController.configuration.isRowSelected(row)).toBe(false);
      });
    });

  });

  describe('#invertSelection', () => {

    it('inverts a selection', () => {
      const data = gridController.configuration.data;

      gridController.configuration.selectRow(data[0]);
      gridController.configuration.invertSelection();
      expect(gridController.configuration.isRowSelected(data[0])).toBe(false);
      expect(gridController.configuration.isRowSelected(data[1])).toBe(true);
      expect(gridController.configuration.isRowSelected(data[2])).toBe(true);
    });

  });
});

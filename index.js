import { dropdown_menu } from './dropdown_menu';
import { scatterplot } from './scatterplot';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;

let xColumn;
let yColumn;
let wine_type;

const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const onDatasetClicked = column => {
  wine_type = column;
  render();
};

const render = () => {
  d3.select('#x-menu')
    .call(dropdown_menu, {
  		options: ['fixed_acidity','volatile_acidity','citric_acid','residual_sugar','chlorides','free_sulfur_dioxide','pH','sulphates','alcohol','quality'],
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });
  
  d3.select('#y-menu')
    .call(dropdown_menu, {
  		options: ['fixed_acidity','volatile_acidity','citric_acid','residual_sugar','chlorides','free_sulfur_dioxide','pH','sulphates','alcohol','quality'],
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });
  
  d3.select('#data-menu')
    .call(dropdown_menu, {
      options: ['Red Wine','White Wine'],
      onOptionClicked: onDatasetClicked
    });

  svg.call(scatterplot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    margin: { top: 10, right: 40, bottom: 150, left: 100 },
    width,
    height,
    data,
    wine_type
  });
};

d3.csv('data_wine.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
     d.fixed_acidity = +d.fixed_acidity;
      d.volatile_acidity = +d.volatile_acidity;
      d.citric_acid = +d.citric_acid;
      d.residual_sugar = +d.residual_sugar;
      d.chlorides = +d.chlorides;
      d.free_sulfur_dioxide = +d.free_sulfur_dioxide;
      d.density = +d.density;
      d.pH = +d.pH;
      d.sulphates = +d.sulphates;
      d.alcohol = +d.alcohol;
      d.quality = +d.quality;
      d.wine_type = d.wine_type;
    });
    xColumn = data.columns[0];
    yColumn = data.columns[0];
  	wine_type = 'Red Wine';
  	render();
    
  });
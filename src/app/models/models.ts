import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexLegend,
    ApexFill,
    ApexNonAxisChartSeries,
    ApexStroke,
    ApexTooltip
  } from "ng-apexcharts";

export type User = {
    fullName:string,
    email:string,
    password:string
}

export enum State {ERROR , SUCCESS }

export type ChartOptions = {
    series: ApexAxisChartSeries|ApexNonAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    labels:any;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
};

export type product = {
    id:number,
    name:string,
    quantity:number,
    price:number,
}


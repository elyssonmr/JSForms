angular.module("protocolApp")
.controller('reportController', function($scope, IdxDbService) {
    $scope.protocols = [];

    $scope.init = function() {
        //Init the DB
        IdxDbService.init();
        $('#loading').modal('show');
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.protocols = IdxDbService.getProtocols();
                $scope.loadCharts();
                $('#loading').modal('hide');
            });
        }, 2000);
    };

    $scope.loadCharts = function() {
        $scope.loadStatusChart();
        $scope.loadTypeChart();
    };

    $scope.loadStatusChart = function() {
        var serie = {
            type: 'pie',
            name: 'Procentagem',
            data: [
                {name:'Protocolado', y:0, color:"#29D124"},
                {name:'Com pedência', y:0, color:"#FFFF00"},
                {name:'Recusado', y:0, color:"#FF0000"},
            ]
        };

        $.each($scope.protocols, function(idx, protocol) {
            if(protocol.status == "Protocolado") {
                serie.data[0].y += 1;
            } else if(protocol.status == "Com Pendência") {
                serie.data[1].y += 1;
            } else if(protocol.status == "Recusado") {
                serie.data[2].y += 1;
            }
        });

        $scope.pieTemplate.series.push(serie);

        $("#statusChart").highcharts($scope.pieTemplate);
    };

    $scope.loadTypeChart = function() {
        var serie = {
            name: "Tipos de Documento",
            data: [
                {color:highchartsOptions.colors[0], y:0},
                {color:highchartsOptions.colors[1], y:0},
                {color:highchartsOptions.colors[2], y:0}
            ]
        };

        $.each($scope.protocols, function(idx, protocol) {
            if(protocol.type == "Documento") {
                serie.data[0].y += 1;
            } else if(protocol.type == "Pasta") {
                serie.data[1].y += 1;
            } else if(protocol.type == "Outros") {
                serie.data[2].y += 1;
            }
        });

        $scope.columnTemplate.series.push(serie);

        $("#typeChart").highcharts($scope.columnTemplate);

    };

    $scope.columnTemplate = {
        chart: {
                type: 'column'
            },
            title: {
                text: 'Quantidade de Protocolos por Tipo'
            },
            xAxis: {
                categories: ['Documento', 'Pasta', 'Outros']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantidade'
                },
                tickInterval: 5
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{series.name}: <b>{point.y} un</b>',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                enabled: false
            },
            series: []
        };

    $scope.pieTemplate = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Status dos Protocolos'
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}:</b> {point.percentage:.2f} %'
                },
                showInLegend: true
            }
        },
        series: []
    };
});

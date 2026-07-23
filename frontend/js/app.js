// HAWK OPERATIONS

// ELEMENTOS - DASHBOARD

const tableBody =
    document.getElementById("veiculosTable");

const totalVeiculos =
    document.getElementById("totalVeiculos");

const veiculosAtivos =
    document.getElementById("veiculosAtivos");

const veiculosManutencao =
    document.getElementById("veiculosManutencao");

const operacaoHoje =
    document.getElementById("operacaoHoje");

const searchInput =
    document.getElementById("searchInput");

// ELEMENTOS - GRÁFICOS DO DASHBOARD

const dashboardFleetChartCanvas =
    document.getElementById(
        "dashboardFleetChart"
    );

const dashboardOperationStatusChartCanvas =
    document.getElementById(
        "dashboardOperationStatusChart"
    );

const dashboardUtilizationChartCanvas =
    document.getElementById(
        "dashboardUtilizationChart"
    );

const dashboardShiftChartCanvas =
    document.getElementById(
        "dashboardShiftChart"
    );

const dashboardMaintenanceTrendChartCanvas =
    document.getElementById(
        "dashboardMaintenanceTrendChart"
    );

const dashboardTopMaintenanceVehiclesChartCanvas =
    document.getElementById(
        "dashboardTopMaintenanceVehiclesChart"
    );

// ELEMENTOS - NAVEGAÇÃO

const menuDashboard =
    document.getElementById("menuDashboard");

const menuFleet =
    document.getElementById("menuFleet");

const menuDrivers =
    document.getElementById("menuDrivers");

const menuMaintenance =
    document.getElementById("menuMaintenance");

const menuOperations =
    document.getElementById("menuOperations");

const menuPanorama =
    document.getElementById("menuPanorama");

const dashboardView =
    document.getElementById("dashboardView");

const fleetView =
    document.getElementById("fleetView");

const driversView =
    document.getElementById("driversView");

const maintenanceView =
    document.getElementById("maintenanceView");

const operationsView =
    document.getElementById("operationsView");

const panoramaView =
    document.getElementById("panoramaView");

// ELEMENTOS - FROTA

const fleetTable =
    document.getElementById(
        "fleetTable"
    );

const fleetTotal =
    document.getElementById(
        "fleetTotal"
    );

const fleetAvailable =
    document.getElementById(
        "fleetAvailable"
    );

const fleetMaintenance =
    document.getElementById(
        "fleetMaintenance"
    );

const fleetInactive =
    document.getElementById(
        "fleetInactive"
    );

const fleetSearchInput =
    document.getElementById(
        "fleetSearchInput"
    );

const fleetStatusFilter =
    document.getElementById(
        "fleetStatusFilter"
    );

const fleetTypeFilter =
    document.getElementById(
        "fleetTypeFilter"
    );

const openFleetVehicleModal =
    document.getElementById(
        "openFleetVehicleModal"
    );

// ELEMENTOS - VEÍCULOS

const openVehicleModal =
    document.getElementById("openVehicleModal");

const closeVehicleModal =
    document.getElementById("closeVehicleModal");

const cancelVehicleModal =
    document.getElementById("cancelVehicleModal");

const vehicleModal =
    document.getElementById("vehicleModal");

const vehicleForm =
    document.getElementById("vehicleForm");

const vehicleFormMessage =
    document.getElementById("vehicleFormMessage");

const saveVehicleButton =
    document.getElementById("saveVehicleButton");

const vehiclePlate =
    document.getElementById("vehiclePlate");

const vehicleType =
    document.getElementById("vehicleType");

const vehicleCategory =
    document.getElementById("vehicleCategory");

const vehicleObservation =
    document.getElementById("vehicleObservation");

// ELEMENTOS - EDIÇÃO DE VEÍCULO

const editVehicleModal =
    document.getElementById("editVehicleModal");

const closeEditVehicleModal =
    document.getElementById("closeEditVehicleModal");

const cancelEditVehicleModal =
    document.getElementById("cancelEditVehicleModal");

const editVehicleForm =
    document.getElementById("editVehicleForm");

const editVehicleId =
    document.getElementById("editVehicleId");

const editVehiclePlate =
    document.getElementById("editVehiclePlate");

const editVehicleType =
    document.getElementById("editVehicleType");

const editVehicleCategory =
    document.getElementById("editVehicleCategory");

const editVehicleStatus =
    document.getElementById("editVehicleStatus");

const editVehicleObservation =
    document.getElementById("editVehicleObservation");

const editVehicleFormMessage =
    document.getElementById("editVehicleFormMessage");

const saveEditVehicleButton =
    document.getElementById("saveEditVehicleButton");

// ELEMENTOS - HISTÓRICO DO VEÍCULO

const vehicleHistoryModal =
    document.getElementById("vehicleHistoryModal");

const closeVehicleHistoryModal =
    document.getElementById("closeVehicleHistoryModal");

const closeVehicleHistoryButton =
    document.getElementById("closeVehicleHistoryButton");

const vehicleHistoryPlate =
    document.getElementById("vehicleHistoryPlate");

const vehicleHistoryMeta =
    document.getElementById("vehicleHistoryMeta");

const vehicleHistoryOperationsTotal =
    document.getElementById("vehicleHistoryOperationsTotal");

const vehicleHistoryMaintenanceTotal =
    document.getElementById("vehicleHistoryMaintenanceTotal");

const vehicleHistoryStatus =
    document.getElementById("vehicleHistoryStatus");

const vehicleHistoryMessage =
    document.getElementById("vehicleHistoryMessage");

const vehicleHistoryContent =
    document.getElementById("vehicleHistoryContent");

// ELEMENTOS - MOTORISTAS

const driversTable =
    document.getElementById("driversTable");

const driversTotal =
    document.getElementById("driversTotal");

const driversRegistered =
    document.getElementById("driversRegistered");

const driversInactive =
    document.getElementById("driversInactive");

const driversOperationsToday =
    document.getElementById("driversOperationsToday");

const driverSearchInput =
    document.getElementById("driverSearchInput");

const driverStatusFilter =
    document.getElementById("driverStatusFilter");

// NOVO MOTORISTA

const openDriverModal =
    document.getElementById("openDriverModal");

const closeDriverModal =
    document.getElementById("closeDriverModal");

const cancelDriverModal =
    document.getElementById("cancelDriverModal");

const driverModal =
    document.getElementById("driverModal");

const driverForm =
    document.getElementById("driverForm");

const driverName =
    document.getElementById("driverName");

const driverPhone =
    document.getElementById("driverPhone");

const driverObservation =
    document.getElementById("driverObservation");

const driverFormMessage =
    document.getElementById("driverFormMessage");

const saveDriverButton =
    document.getElementById("saveDriverButton");

// EDITAR MOTORISTA

const editDriverModal =
    document.getElementById("editDriverModal");

const closeEditDriverModal =
    document.getElementById("closeEditDriverModal");

const cancelEditDriverModal =
    document.getElementById("cancelEditDriverModal");

const editDriverForm =
    document.getElementById("editDriverForm");

const editDriverId =
    document.getElementById("editDriverId");

const editDriverName =
    document.getElementById("editDriverName");

const editDriverPhone =
    document.getElementById("editDriverPhone");

const editDriverObservation =
    document.getElementById("editDriverObservation");

const editDriverStatus =
    document.getElementById("editDriverStatus");

const editDriverFormMessage =
    document.getElementById("editDriverFormMessage");

const saveEditDriverButton =
    document.getElementById("saveEditDriverButton");

// HISTÓRICO DO MOTORISTA

const driverHistoryModal =
    document.getElementById("driverHistoryModal");

const closeDriverHistoryModal =
    document.getElementById("closeDriverHistoryModal");

const closeDriverHistoryButton =
    document.getElementById("closeDriverHistoryButton");

const driverHistoryName =
    document.getElementById("driverHistoryName");

const driverHistoryMeta =
    document.getElementById("driverHistoryMeta");

const driverHistoryOperationsTotal =
    document.getElementById("driverHistoryOperationsTotal");

const driverHistoryVehiclesTotal =
    document.getElementById("driverHistoryVehiclesTotal");

const driverHistoryRoutesTotal =
    document.getElementById("driverHistoryRoutesTotal");

const driverHistoryLastActivity =
    document.getElementById("driverHistoryLastActivity");

const driverHistoryMessage =
    document.getElementById("driverHistoryMessage");

const driverHistoryContent =
    document.getElementById("driverHistoryContent");

// ELEMENTOS - MANUTENÇÕES

const maintenanceTable =
    document.getElementById("maintenanceTable");

const maintenanceTotal =
    document.getElementById("maintenanceTotal");

const openMaintenanceModal =
    document.getElementById("openMaintenanceModal");

const closeMaintenanceModal =
    document.getElementById("closeMaintenanceModal");

const cancelMaintenanceModal =
    document.getElementById("cancelMaintenanceModal");

const maintenanceModal =
    document.getElementById("maintenanceModal");

const maintenanceForm =
    document.getElementById("maintenanceForm");

const maintenanceVehicle =
    document.getElementById("maintenanceVehicle");

const maintenanceReason =
    document.getElementById("maintenanceReason");

const maintenanceEntryDate =
    document.getElementById("maintenanceEntryDate");

const maintenanceReturnDate =
    document.getElementById("maintenanceReturnDate");

const maintenanceFormMessage =
    document.getElementById("maintenanceFormMessage");

const saveMaintenanceButton =
    document.getElementById("saveMaintenanceButton");

// HISTÓRICO DE MANUTENÇÕES

const maintenanceFinishedTotal =
    document.getElementById("maintenanceFinishedTotal");

const maintenanceOverdueTotal =
    document.getElementById("maintenanceOverdueTotal");

const maintenanceAllTotal =
    document.getElementById("maintenanceAllTotal");

const maintenanceHistorySearch =
    document.getElementById("maintenanceHistorySearch");

const maintenanceHistoryTable =
    document.getElementById("maintenanceHistoryTable");

// FINALIZAR MANUTENÇÃO

const finishMaintenanceModal =
    document.getElementById("finishMaintenanceModal");

const finishMaintenanceForm =
    document.getElementById("finishMaintenanceForm");

const finishMaintenanceId =
    document.getElementById("finishMaintenanceId");

const finishMaintenanceVehicleInfo =
    document.getElementById("finishMaintenanceVehicleInfo");

const finishMaintenanceReturnDate =
    document.getElementById("finishMaintenanceReturnDate");

const finishMaintenanceService =
    document.getElementById("finishMaintenanceService");

const finishMaintenanceCondition =
    document.getElementById("finishMaintenanceCondition");

const finishMaintenanceWorkshop =
    document.getElementById("finishMaintenanceWorkshop");

const finishMaintenanceCost =
    document.getElementById("finishMaintenanceCost");

const finishMaintenanceObservation =
    document.getElementById("finishMaintenanceObservation");

const finishMaintenanceMessage =
    document.getElementById("finishMaintenanceMessage");

const closeFinishMaintenanceModal =
    document.getElementById("closeFinishMaintenanceModal");

const cancelFinishMaintenanceModal =
    document.getElementById("cancelFinishMaintenanceModal");

const saveFinishMaintenanceButton =
    document.getElementById("saveFinishMaintenanceButton");

// DETALHES DA MANUTENÇÃO

const maintenanceDetailsModal =
    document.getElementById("maintenanceDetailsModal");

const maintenanceDetailsVehicle =
    document.getElementById("maintenanceDetailsVehicle");

const maintenanceDetailsPeriod =
    document.getElementById("maintenanceDetailsPeriod");

const maintenanceDetailsContent =
    document.getElementById("maintenanceDetailsContent");

const closeMaintenanceDetailsModal =
    document.getElementById("closeMaintenanceDetailsModal");

const closeMaintenanceDetailsButton =
    document.getElementById("closeMaintenanceDetailsButton");

// ELEMENTOS - OPERAÇÕES

const operationsTable =
    document.getElementById("operationsTable");

const operationFilterDate =
    document.getElementById("operationFilterDate");

const operationFilterShift =
    document.getElementById("operationFilterShift");

const openOperationModal =
    document.getElementById("openOperationModal");

const closeOperationModal =
    document.getElementById("closeOperationModal");

const cancelOperationModal =
    document.getElementById("cancelOperationModal");

const operationModal =
    document.getElementById("operationModal");

const operationForm =
    document.getElementById("operationForm");

const operationDate =
    document.getElementById("operationDate");

const operationShift =
    document.getElementById("operationShift");

const operationVehicle =
    document.getElementById("operationVehicle");

const operationDriver =
    document.getElementById("operationDriver");

const operationRoute =
    document.getElementById("operationRoute");

const operationStatus =
    document.getElementById("operationStatus");

const operationObservation =
    document.getElementById("operationObservation");

const operationFormMessage =
    document.getElementById("operationFormMessage");

const saveOperationButton =
    document.getElementById("saveOperationButton");

// SINCRONIZAÇÃO AUTOMÁTICA

const syncOperationButton =
    document.getElementById(
        "syncOperationButton"
    );

const syncStatusCard =
    document.getElementById(
        "syncStatusCard"
    );

const syncStatusIcon =
    document.getElementById(
        "syncStatusIcon"
    );

const syncStatusTitle =
    document.getElementById(
        "syncStatusTitle"
    );

const syncStatusMessage =
    document.getElementById(
        "syncStatusMessage"
    );


let syncStatusInterval =
    null;


let ultimaSincronizacaoConcluida =
    null;

// ELEMENTOS - PANORAMA

const panoramaDate =
    document.getElementById( "panoramaDate" );

const panoramaShift =
    document.getElementById("panoramaShift");

const generatePanoramaButton =
    document.getElementById("generatePanoramaButton");

const copyPanoramaButton =
    document.getElementById("copyPanoramaButton");

const panoramaText =
    document.getElementById("panoramaText");

const panoramaMessage =
    document.getElementById("panoramaMessage");

const panoramaTotalVehicles =
    document.getElementById("panoramaTotalVehicles");

const panoramaMaintenance =
    document.getElementById("panoramaMaintenance");

const panoramaOperations =
    document.getElementById("panoramaOperations");

// DADOS

let veiculos = [];

let manutencoesAtivas = [];

let manutencoesFinalizadas = [];

let motoristas = [];

let operacoes = [];

// INSTÂNCIAS DOS GRÁFICOS

let dashboardFleetChartInstance =
    null;

let dashboardOperationStatusChartInstance =
    null;

let dashboardUtilizationChartInstance =
    null;

let dashboardShiftChartInstance =
    null;

let dashboardMaintenanceTrendChartInstance =
    null;

let dashboardTopMaintenanceVehiclesChartInstance =
    null;

// STATUS DA OPERAÇÃO

const statusOperacao = {

    CARREGANDO: {
        texto: "✅ Carregando",
        classe: "badge-active"
    },

    RESERVA_CARREGANDO: {
        texto: "🚗 Reserva / Carregando",
        classe: "badge-operation"
    },

    FOLGA: {
        texto: "⚠️ Folga",
        classe: "badge-maintenance"
    },

    IMPEDIDO: {
        texto: "🚫 Impedido",
        classe: "badge-inactive"
    },

    SEM_CARGA: {
        texto: "📦 Sem carga",
        classe: "badge-operation"
    },

    OUTRO_SERVICE: {
        texto: "🔄 Outro service",
        classe: "badge-operation"
    },

    INDISPONIVEL_MOTORISTA: {
        texto: "⏸️ Indisponível / Motorista",
        classe: "badge-inactive"
    }

};

// UTILITÁRIOS

function hojeISO() {

    const hoje =
        new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );

    return `${ano}-${mes}-${dia}`;

}

function formatarData(
    data
) {

    if (!data) {

        return "—";

    }

    const [
        ano,
        mes,
        dia
    ] =
        data.split("-");

    return `${dia}/${mes}/${ano}`;

}

function escaparHTML(
    valor
) {

    return String(
        valor
        ??
        ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}

function garantirOpcaoSelect(
    select,
    valor
) {

    if (
        !select
        ||
        !valor
    ) {

        return;

    }

    const existe =
        Array
            .from(
                select.options
            )
            .some(

                option =>
                    option.value
                    ===
                    valor

            );

    if (!existe) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            valor;

        option.textContent =
            valor;

        select.appendChild(
            option
        );

    }

}

function buscarVeiculo(
    id
) {

    return veiculos.find(

        veiculo =>
            veiculo.id === id

    );

}

function buscarMotorista(
    id
) {

    return motoristas.find(

        motorista =>
            motorista.id === id

    );

}

function buscarManutencaoAtiva(
    veiculoId
) {

    return manutencoesAtivas.find(

        manutencao =>

            manutencao.veiculo_id
            ===
            veiculoId

    );

}

// CARREGAR DADOS

async function carregarDados() {

    try {

    const [

        responseVeiculos,

        responseManutencoes,

        responseManutencoesFinalizadas,

        responseMotoristas,

        responseOperacoes

    ] = await Promise.all([

    fetch("/veiculos"),

    fetch("/manutencoes/ativas"),

    fetch("/manutencoes/finalizadas"),

    fetch("/motoristas"),

    fetch("/operacoes")
    
        ]);

    if (
        !responseVeiculos.ok
        ||
        !responseManutencoes.ok
        ||
        !responseManutencoesFinalizadas.ok
        ||
        !responseMotoristas.ok
        ||
        !responseOperacoes.ok
    ) {

            throw new Error(
                "Não foi possível carregar os dados."
            );

        }

        veiculos =
            await responseVeiculos.json();

        manutencoesAtivas =
            await responseManutencoes.json();

        manutencoesFinalizadas =
            await responseManutencoesFinalizadas.json();

        motoristas =
            await responseMotoristas.json();

        operacoes =
            await responseOperacoes.json();

        atualizarIndicadores();

        atualizarGraficosDashboard();

        renderizarVeiculos(
            veiculos
        );

        atualizarResumoFrota();

        atualizarFiltroTiposFrota();

        aplicarFiltrosFrota();

        renderizarManutencoes();

        atualizarResumoManutencoes();

        aplicarFiltroHistoricoManutencoes();

        atualizarResumoMotoristas();

        aplicarFiltrosMotoristas();

        atualizarSelectManutencao();

        atualizarSelectsOperacao();

        aplicarFiltrosOperacao();

    } catch (error) {

        console.error(
            "Erro ao carregar dados:",
            error
        );

    }

}

// INDICADORES

function atualizarIndicadores() {

    const ativos =
        veiculos.filter(

            veiculo =>
                veiculo.ativo

        );

    const disponiveis =

        ativos.length

        -

        manutencoesAtivas.length;

    if (totalVeiculos) {

        totalVeiculos.textContent =
            veiculos.length;

    }

    if (veiculosAtivos) {

        veiculosAtivos.textContent =
            Math.max(
                disponiveis,
                0
            );

    }

    if (veiculosManutencao) {

        veiculosManutencao.textContent =
            manutencoesAtivas.length;

    }

    if (maintenanceTotal) {

        maintenanceTotal.textContent =
            manutencoesAtivas.length;

    }

    if (driversTotal) {

        driversTotal.textContent =

            motoristas.filter(

                motorista =>
                    motorista.ativo

            ).length;

    }

    if (operacaoHoje) {

        const hoje =
            hojeISO();

        const registrosHoje =
            operacoes.filter(

                operacao =>
                    operacao.data === hoje

            );

        operacaoHoje.textContent =
            registrosHoje.length;

    }

}

// GRÁFICOS DO DASHBOARD

function dataParaISO(
    data
) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );

    const dia =
        String(
            data.getDate()
        )
        .padStart(
            2,
            "0"
        );

    return `${ano}-${mes}-${dia}`;

}

function obterUltimosDias(
    quantidade
) {

    const resultado =
        [];

    const hoje =
        new Date();

    for (
        let indice = quantidade - 1;
        indice >= 0;
        indice--
    ) {

        const data =
            new Date(
                hoje
            );

        data.setDate(

            hoje.getDate()

            -

            indice

        );

        resultado.push(
            dataParaISO(
                data
            )
        );

    }

    return resultado;

}

function formatarDataGrafico(
    data
) {

    const partes =
        data.split(
            "-"
        );

    return `${partes[2]}/${partes[1]}`;

}

function destruirGrafico(
    grafico
) {

    if (grafico) {

        grafico.destroy();

    }

}

function atualizarGraficosDashboard() {

    if (typeof Chart === "undefined") {
        console.warn("Chart.js não foi carregado.");
        return;
    }

    Chart.defaults.font.family =
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

    Chart.defaults.color = "#6e7888";

    // =================================================
    // SITUAÇÃO ATUAL DA FROTA
    // =================================================

    const resumoFrota = {
        DISPONIVEL: 0,
        MANUTENCAO: 0,
        INATIVO: 0
    };

    veiculos.forEach(veiculo => {
        const status = obterStatusVeiculo(veiculo);

        if (resumoFrota[status] !== undefined) {
            resumoFrota[status]++;
        }
    });

    destruirGrafico(dashboardFleetChartInstance);

    if (dashboardFleetChartCanvas) {
        dashboardFleetChartInstance = new Chart(
            dashboardFleetChartCanvas,
            {
                type: "doughnut",
                data: {
                    labels: [
                        "Disponíveis",
                        "Em manutenção",
                        "Inativos"
                    ],
                    datasets: [
                        {
                            data: [
                                resumoFrota.DISPONIVEL,
                                resumoFrota.MANUTENCAO,
                                resumoFrota.INATIVO
                            ],
                            backgroundColor: [
                                "#18a66a",
                                "#e5a11a",
                                "#94a3b8"
                            ],
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "72%",
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                usePointStyle: true,
                                boxWidth: 8,
                                padding: 20
                            }
                        }
                    }
                }
            }
        );
    }

    // =================================================
    // OPERAÇÃO DE HOJE POR STATUS
    // =================================================

    const hoje = hojeISO();

    const operacoesHoje = operacoes.filter(
        operacao => operacao.data === hoje
    );

    const chavesStatus = Object.keys(statusOperacao);

    const dadosStatus = chavesStatus.map(
        status =>
            operacoesHoje.filter(
                operacao => operacao.status === status
            ).length
    );

    destruirGrafico(dashboardOperationStatusChartInstance);

    if (dashboardOperationStatusChartCanvas) {
        dashboardOperationStatusChartInstance = new Chart(
            dashboardOperationStatusChartCanvas,
            {
                type: "bar",
                data: {
                    labels: chavesStatus.map(
                        status => statusOperacao[status].texto
                    ),
                    datasets: [
                        {
                            label: "Registros",
                            data: dadosStatus,
                            backgroundColor: "#1c5796",
                            borderRadius: 6,
                            maxBarThickness: 26
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            },
                            grid: {
                                color: "#edf0f4"
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
    }

    // =================================================
    // OPERAÇÕES POR TURNO
    // =================================================

    const turnos = [
        "Manhã",
        "Tarde",
        "Noite"
    ];

    const dadosTurnos = turnos.map(
        turno =>
            operacoesHoje.filter(
                operacao => operacao.turno === turno
            ).length
    );

    destruirGrafico(dashboardShiftChartInstance);

    if (dashboardShiftChartCanvas) {
        dashboardShiftChartInstance = new Chart(
            dashboardShiftChartCanvas,
            {
                type: "bar",
                data: {
                    labels: turnos,
                    datasets: [
                        {
                            label: "Operações",
                            data: dadosTurnos,
                            backgroundColor: [
                                "#1c5796",
                                "#4d7eb3",
                                "#8ca9c7"
                            ],
                            borderRadius: 7,
                            maxBarThickness: 52
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            },
                            grid: {
                                color: "#edf0f4"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
    }

    // =================================================
    // UTILIZAÇÃO DA FROTA NOS ÚLTIMOS 30 DIAS
    // =================================================

    const ultimosDias = obterUltimosDias(30);

    const utilizacaoPorDia = ultimosDias.map(data => {

        const veiculosDoDia = new Set(
            operacoes
                .filter(
                    operacao =>
                        operacao.data === data
                        &&
                        operacao.veiculo_id
                )
                .map(
                    operacao => operacao.veiculo_id
                )
        );

        return veiculosDoDia.size;

    });

    destruirGrafico(dashboardUtilizationChartInstance);

    if (dashboardUtilizationChartCanvas) {
        dashboardUtilizationChartInstance = new Chart(
            dashboardUtilizationChartCanvas,
            {
                type: "line",
                data: {
                    labels: ultimosDias.map(
                        formatarDataGrafico
                    ),
                    datasets: [
                        {
                            label: "Veículos utilizados",
                            data: utilizacaoPorDia,
                            borderColor: "#1c5796",
                            backgroundColor: "rgba(28, 87, 150, 0.10)",
                            fill: true,
                            tension: 0.35,
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: "index"
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            },
                            grid: {
                                color: "#edf0f4"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 10
                            }
                        }
                    }
                }
            }
        );
    }

    // =================================================
    // MANUTENÇÕES NOS ÚLTIMOS 6 MESES
    // =================================================

    const todasManutencoes = [
        ...manutencoesAtivas,
        ...manutencoesFinalizadas
    ];

    const meses = [];
    const dataAtual = new Date();

    for (
        let indice = 5;
        indice >= 0;
        indice--
    ) {

        const data = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth() - indice,
            1
        );

        const chave =
            `${data.getFullYear()}-${String(
                data.getMonth() + 1
            ).padStart(2, "0")}`;

        const nome = data.toLocaleDateString(
            "pt-BR",
            {
                month: "short",
                year: "2-digit"
            }
        );

        meses.push({
            chave,
            nome
        });

    }

    const dadosManutencoesMes = meses.map(
        mes =>
            todasManutencoes.filter(
                manutencao =>
                    manutencao.data_entrada
                    &&
                    manutencao.data_entrada.startsWith(
                        mes.chave
                    )
            ).length
    );

    destruirGrafico(dashboardMaintenanceTrendChartInstance);

    if (dashboardMaintenanceTrendChartCanvas) {
        dashboardMaintenanceTrendChartInstance = new Chart(
            dashboardMaintenanceTrendChartCanvas,
            {
                type: "bar",
                data: {
                    labels: meses.map(
                        mes => mes.nome
                    ),
                    datasets: [
                        {
                            label: "Manutenções",
                            data: dadosManutencoesMes,
                            backgroundColor: "#e5a11a",
                            borderRadius: 7,
                            maxBarThickness: 55
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            },
                            grid: {
                                color: "#edf0f4"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
    }

    // =================================================
    // VEÍCULOS COM MAIS MANUTENÇÕES
    // =================================================

    const quantidadePorVeiculo = {};

    todasManutencoes.forEach(manutencao => {

        const vehicleId = manutencao.veiculo_id;

        if (!vehicleId) {
            return;
        }

        if (!quantidadePorVeiculo[vehicleId]) {
            quantidadePorVeiculo[vehicleId] = 0;
        }

        quantidadePorVeiculo[vehicleId]++;

    });

    const rankingManutencoes = Object
        .entries(quantidadePorVeiculo)
        .map(
            ([
                vehicleId,
                quantidade
            ]) => {

                const veiculo = buscarVeiculo(
                    Number(vehicleId)
                );

                return {
                    placa:
                        veiculo
                        ?
                        veiculo.placa
                        :
                        `Veículo ${vehicleId}`,
                    quantidade
                };

            }
        )
        .sort(
            (
                primeiro,
                segundo
            ) =>
                segundo.quantidade
                -
                primeiro.quantidade
        )
        .slice(0, 10);

    destruirGrafico(
        dashboardTopMaintenanceVehiclesChartInstance
    );

    if (dashboardTopMaintenanceVehiclesChartCanvas) {
        dashboardTopMaintenanceVehiclesChartInstance =
            new Chart(
                dashboardTopMaintenanceVehiclesChartCanvas,
                {
                    type: "bar",
                    data: {
                        labels: rankingManutencoes.map(
                            item => item.placa
                        ),
                        datasets: [
                            {
                                label: "Ocorrências",
                                data: rankingManutencoes.map(
                                    item => item.quantidade
                                ),
                                backgroundColor: "#1c5796",
                                borderRadius: 7,
                                maxBarThickness: 34
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: "y",
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    precision: 0
                                },
                                grid: {
                                    color: "#edf0f4"
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                }
            );
    }

}

// FROTA

function renderizarVeiculos(
    lista
) {

    if (!tableBody) {

        return;

    }

    tableBody.innerHTML =
        "";

    if (
        lista.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="loading"
                >
                    Nenhum veículo encontrado.
                </td>

            </tr>

        `;

        return;

    }

    lista.forEach(

        veiculo => {

            const row =
                document.createElement(
                    "tr"
                );

            const manutencao =
                buscarManutencaoAtiva(
                    veiculo.id
                );

            let statusHTML;

            if (manutencao) {

                statusHTML = `

                    <span
                        class="badge badge-maintenance"
                    >
                        🛠 Em manutenção
                    </span>

                `;

            }

            else if (
                veiculo.ativo
            ) {

                statusHTML = `

                    <span
                        class="badge badge-active"
                    >
                        Disponível
                    </span>

                `;

            }

            else {

                statusHTML = `

                    <span
                        class="badge badge-inactive"
                    >
                        Inativo
                    </span>

                `;

            }

            row.innerHTML = `

                <td class="plate">

                    ${veiculo.placa}

                </td>

                <td>

                    ${
                        veiculo.tipo
                        ??
                        "Não informado"
                    }

                </td>

                <td>

                    ${
                        veiculo.categoria
                    }

                </td>

                <td>

                    ${statusHTML}

                </td>

            `;

            tableBody.appendChild(
                row
            );

        }

    );

}

// TELA DE FROTA

function obterStatusVeiculo(
    veiculo
) {

    if (
        buscarManutencaoAtiva(
            veiculo.id
        )
    ) {

        return "MANUTENCAO";

    }

    if (!veiculo.ativo) {

        return "INATIVO";

    }

    return "DISPONIVEL";

}

function atualizarResumoFrota() {

    if (!fleetTotal) {

        return;

    }

    const disponiveis =
        veiculos.filter(

            veiculo =>

                obterStatusVeiculo(
                    veiculo
                )
                ===
                "DISPONIVEL"

        ).length;

    const inativos =
        veiculos.filter(

            veiculo =>

                obterStatusVeiculo(
                    veiculo
                )
                ===
                "INATIVO"

        ).length;

    fleetTotal.textContent =
        veiculos.length;

    fleetAvailable.textContent =
        disponiveis;

    fleetMaintenance.textContent =
        manutencoesAtivas.length;

    fleetInactive.textContent =
        inativos;

}

function atualizarFiltroTiposFrota() {

    if (!fleetTypeFilter) {

        return;

    }

    const valorAtual =
        fleetTypeFilter.value;

    const tipos = [

        ...new Set(

            veiculos.map(

                veiculo =>

                    veiculo.tipo
                    ||
                    "Não informado"

            )

        )

    ].sort();

    fleetTypeFilter.innerHTML = `

        <option value="">
            Todos os tipos
        </option>

    `;

    tipos.forEach(

        tipo => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                tipo;

            option.textContent =
                tipo;

            fleetTypeFilter.appendChild(
                option
            );

        }

    );

    if (
        tipos.includes(
            valorAtual
        )
    ) {

        fleetTypeFilter.value =
            valorAtual;

    }

}

function aplicarFiltrosFrota() {

    if (!fleetTable) {

        return;

    }

    const busca =
        fleetSearchInput
            ?.value
            .trim()
            .toUpperCase()
        ||
        "";

    const statusSelecionado =
        fleetStatusFilter
            ?.value
        ||
        "";

    const tipoSelecionado =
        fleetTypeFilter
            ?.value
        ||
        "";

    const resultado =
        veiculos.filter(

            veiculo => {

                const tipo =
                    veiculo.tipo
                    ||
                    "Não informado";

                const status =
                    obterStatusVeiculo(
                        veiculo
                    );

                const correspondeBusca =

                    !busca

                    ||

                    veiculo.placa
                        .toUpperCase()
                        .includes(
                            busca
                        );

                const correspondeStatus =

                    !statusSelecionado

                    ||

                    status
                    ===
                    statusSelecionado;

                const correspondeTipo =

                    !tipoSelecionado

                    ||

                    tipo
                    ===
                    tipoSelecionado;
                    return (

                    correspondeBusca

                    &&

                    correspondeStatus

                    &&

                    correspondeTipo

                );

            }

        );

    renderizarFrotaCompleta(
        resultado
    );

}

function renderizarFrotaCompleta(
    lista
) {

    if (!fleetTable) {

        return;

    }

    fleetTable.innerHTML =
        "";

    if (
        lista.length
        ===
        0
    ) {

        fleetTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Nenhum veículo encontrado.
                </td>

            </tr>

        `;

        return;

    }

    lista.forEach(

        veiculo => {

            const status =
                obterStatusVeiculo(
                    veiculo
                );

            let statusHTML = "";

            let manutencaoHTML = "";

            if (
                status
                ===
                "MANUTENCAO"
            ) {

                statusHTML = `

                    <span
                        class="badge badge-maintenance"
                    >
                        🛠 Em manutenção
                    </span>

                `;

                manutencaoHTML = `

                    <button
                        class="
                            action-button
                            go-maintenance
                        "
                        data-vehicle-id="${veiculo.id}"
                        type="button"
                    >
                        Ver manutenção
                    </button>

                `;

            }

            else if (
                status
                ===
                "INATIVO"
            ) {

                statusHTML = `

                    <span
                        class="badge badge-inactive"
                    >
                        Inativo
                    </span>

                `;

            }

            else {

                statusHTML = `

                    <span
                        class="badge badge-active"
                    >
                        Disponível
                    </span>

                `;

                manutencaoHTML = `

                    <button
                        class="
                            action-button
                            fleet-maintenance-button
                        "
                        data-vehicle-id="${veiculo.id}"
                        type="button"
                    >
                        Manutenção
                    </button>

                `;

            }

            const toggleLabel =
                veiculo.ativo
                ?
                "Inativar"
                :
                "Reativar";

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `

                <td class="plate">

                    ${escaparHTML(
                        veiculo.placa
                    )}

                </td>

                <td>

                    ${escaparHTML(
                        veiculo.tipo
                        ||
                        "Não informado"
                    )}

                </td>

                <td>

                    ${escaparHTML(
                        veiculo.categoria
                    )}

                </td>

                <td>

                    ${statusHTML}

                </td>

                <td>

                    <div class="fleet-actions">

                        <button
                            class="
                                action-button
                                edit-vehicle
                            "
                            data-vehicle-id="${veiculo.id}"
                            type="button"
                        >
                            Editar
                        </button>

                        <button
                            class="
                                action-button
                                history-vehicle
                            "
                            data-vehicle-id="${veiculo.id}"
                            type="button"
                        >
                            Histórico
                        </button>

                        ${manutencaoHTML}

                        <button
                            class="
                                action-button
                                toggle-vehicle
                            "
                            data-vehicle-id="${veiculo.id}"
                            type="button"
                        >
                            ${toggleLabel}
                        </button>

                        <button
                            class="
                                action-button
                                delete-vehicle
                            "
                            data-vehicle-id="${veiculo.id}"
                            type="button"
                        >
                            Excluir
                        </button>

                    </div>

                </td>

            `;

            fleetTable.appendChild(
                row
            );

        }

    );

}

// MANUTENÇÕES

function renderizarManutencoes() {

    if (!maintenanceTable) {
        return;
    }

    maintenanceTable.innerHTML = "";

    if (manutencoesAtivas.length === 0) {
        maintenanceTable.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="loading"
                >
                    Nenhum veículo em manutenção.
                </td>
            </tr>
        `;

        return;
    }

    manutencoesAtivas.forEach(manutencao => {

        const veiculo = buscarVeiculo(
            manutencao.veiculo_id
        );

        const hoje = hojeISO();

        const atrasada =
            manutencao.previsao_retorno
            &&
            manutencao.previsao_retorno < hoje;

        const statusHTML =
            atrasada
            ?
            `
                <span class="badge badge-inactive">
                    Retorno atrasado
                </span>
            `
            :
            `
                <span class="badge badge-maintenance">
                    Em manutenção
                </span>
            `;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="plate">
                ${escaparHTML(
                    veiculo
                    ?
                    veiculo.placa
                    :
                    "Não encontrado"
                )}
            </td>

            <td>
                ${escaparHTML(
                    manutencao.motivo
                )}
            </td>

            <td>
                ${formatarData(
                    manutencao.data_entrada
                )}
            </td>

            <td>
                ${formatarData(
                    manutencao.previsao_retorno
                )}
            </td>

            <td>
                ${statusHTML}
            </td>

            <td>
                <div class="maintenance-actions">

                    <button
                        class="
                            action-button
                            finish-maintenance
                        "
                        data-maintenance-id="${manutencao.id}"
                        type="button"
                    >
                        Registrar retorno
                    </button>

                    <button
                        class="
                            action-button
                            view-maintenance-details
                        "
                        data-maintenance-id="${manutencao.id}"
                        data-maintenance-source="active"
                        type="button"
                    >
                        Ver detalhes
                    </button>

                </div>
            </td>
        `;

        maintenanceTable.appendChild(row);

    });

}

function atualizarResumoManutencoes() {

    const hoje = hojeISO();

    const atrasadas = manutencoesAtivas.filter(
        manutencao =>
            manutencao.previsao_retorno
            &&
            manutencao.previsao_retorno < hoje
    ).length;

    if (maintenanceTotal) {
        maintenanceTotal.textContent =
            manutencoesAtivas.length;
    }

    if (maintenanceFinishedTotal) {
        maintenanceFinishedTotal.textContent =
            manutencoesFinalizadas.length;
    }

    if (maintenanceOverdueTotal) {
        maintenanceOverdueTotal.textContent =
            atrasadas;
    }

    if (maintenanceAllTotal) {
        maintenanceAllTotal.textContent =
            manutencoesAtivas.length
            +
            manutencoesFinalizadas.length;
    }

}

function aplicarFiltroHistoricoManutencoes() {

    const busca =
        maintenanceHistorySearch
            ?.value
            .trim()
            .toUpperCase()
        ||
        "";

    const resultado = manutencoesFinalizadas.filter(
        manutencao => {

            const veiculo = buscarVeiculo(
                manutencao.veiculo_id
            );

            if (!busca) {
                return true;
            }

            return (
                veiculo
                &&
                veiculo.placa
                    .toUpperCase()
                    .includes(busca)
            );

        }
    );

    renderizarHistoricoManutencoes(
        resultado
    );

}

function renderizarHistoricoManutencoes(
    lista
) {

    if (!maintenanceHistoryTable) {
        return;
    }

    maintenanceHistoryTable.innerHTML = "";

    if (lista.length === 0) {
        maintenanceHistoryTable.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="loading"
                >
                    Nenhuma manutenção finalizada encontrada.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(manutencao => {

        const veiculo = buscarVeiculo(
            manutencao.veiculo_id
        );

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="plate">
                ${escaparHTML(
                    veiculo
                    ?
                    veiculo.placa
                    :
                    "Não encontrado"
                )}
            </td>

            <td>
                ${escaparHTML(
                    manutencao.motivo
                )}
            </td>

            <td>
                ${formatarData(
                    manutencao.data_entrada
                )}
            </td>

            <td>
                ${formatarData(
                    manutencao.data_retorno
                )}
            </td>

            <td>
                ${escaparHTML(
                    manutencao.condicao_retorno
                    ||
                    "Não informada"
                )}
            </td>

            <td>
                <button
                    class="
                        action-button
                        view-maintenance-details
                    "
                    data-maintenance-id="${manutencao.id}"
                    data-maintenance-source="finished"
                    type="button"
                >
                    Ver detalhes
                </button>
            </td>
        `;

        maintenanceHistoryTable.appendChild(
            row
        );

    });

}

function atualizarSelectManutencao() {

    if (!maintenanceVehicle) {
        return;
    }

    maintenanceVehicle.innerHTML = `
        <option value="">
            Selecione uma placa
        </option>
    `;

    const disponiveis = veiculos.filter(
        veiculo =>
            veiculo.ativo
            &&
            !buscarManutencaoAtiva(
                veiculo.id
            )
    );

    disponiveis.forEach(veiculo => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            veiculo.id;

        option.textContent =
            veiculo.placa;

        maintenanceVehicle.appendChild(
            option
        );

    });

}

// MOTORISTAS

function atualizarResumoMotoristas() {

    const ativos =
        motoristas.filter(
            motorista =>
                motorista.ativo
        ).length;

    const inativos =
        motoristas.filter(
            motorista =>
                !motorista.ativo
        ).length;

    const hoje =
        hojeISO();

    const operacoesHojeComMotorista =
        operacoes.filter(

            operacao =>

                operacao.data === hoje

                &&

                operacao.motorista_id !== null

        ).length;

    if (driversRegistered) {

        driversRegistered.textContent =
            motoristas.length;

    }

    if (driversTotal) {

        driversTotal.textContent =
            ativos;

    }

    if (driversInactive) {

        driversInactive.textContent =
            inativos;

    }

    if (driversOperationsToday) {

        driversOperationsToday.textContent =
            operacoesHojeComMotorista;

    }

}

function aplicarFiltrosMotoristas() {

    if (!driversTable) {

        return;

    }

    const busca =
        driverSearchInput
            ?.value
            .trim()
            .toLowerCase()
        ||
        "";

    const statusSelecionado =
        driverStatusFilter
            ?.value
        ||
        "";

    const resultado =
        motoristas.filter(

            motorista => {

                const correspondeBusca =

                    !busca

                    ||

                    motorista.nome
                        .toLowerCase()
                        .includes(
                            busca
                        )

                    ||

                    (
                        motorista.telefone
                        &&
                        motorista.telefone
                            .toLowerCase()
                            .includes(
                                busca
                            )
                    );

                const statusMotorista =

                    motorista.ativo

                    ?

                    "ATIVO"

                    :

                    "INATIVO";

                const correspondeStatus =

                    !statusSelecionado

                    ||

                    statusMotorista
                    ===
                    statusSelecionado;

                return (

                    correspondeBusca

                    &&

                    correspondeStatus

                );

            }

        );

    renderizarMotoristas(
        resultado
    );

}

function renderizarMotoristas(
    lista
) {

    if (!driversTable) {

        return;

    }

    driversTable.innerHTML =
        "";

    if (
        lista.length
        ===
        0
    ) {

        driversTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Nenhum motorista encontrado.
                </td>

            </tr>

        `;

        return;

    }

    lista.forEach(

        motorista => {

            const row =
                document.createElement(
                    "tr"
                );

            const statusHTML =

                motorista.ativo

                ?

                `

                    <span class="badge badge-active">
                        Ativo
                    </span>

                `

                :

                `

                    <span class="badge badge-inactive">
                        Inativo
                    </span>

                `;

            row.innerHTML = `

                <td>

                    <strong>

                        ${escaparHTML(
                            motorista.nome
                        )}

                    </strong>

                </td>

                <td>

                    ${escaparHTML(
                        motorista.telefone
                        ||
                        "Não informado"
                    )}

                </td>

                <td>

                    ${escaparHTML(
                        motorista.observacao
                        ||
                        "—"
                    )}

                </td>

                <td>

                    ${statusHTML}

                </td>

                <td>

                    <div class="driver-actions">

                        <button
                            class="
                                action-button
                                edit-driver
                            "
                            data-driver-id="${motorista.id}"
                            type="button"
                        >
                            Editar
                        </button>

                        <button
                            class="
                                action-button
                                history-driver
                            "
                            data-driver-id="${motorista.id}"
                            type="button"
                        >
                            Histórico
                        </button>

                        <button
                            class="
                                action-button
                                toggle-driver
                            "
                            data-driver-id="${motorista.id}"
                            type="button"
                        >

                            ${
                                motorista.ativo
                                ?
                                "Inativar"
                                :
                                "Reativar"
                            }

                        </button>

                        <button
                            class="
                                action-button
                                delete-driver
                            "
                            data-driver-id="${motorista.id}"
                            type="button"
                        >
                            Excluir
                        </button>

                    </div>

                </td>

            `;

            driversTable.appendChild(
                row
            );

        }

    );

}

// OPERAÇÕES

function atualizarSelectsOperacao() {

    if (
        !operationVehicle
        ||
        !operationDriver
    ) {

        return;

    }

    operationVehicle.innerHTML = `

        <option value="">
            Selecione uma placa
        </option>

    `;

    const veiculosDisponiveis =
        veiculos.filter(

            veiculo =>

                veiculo.ativo
                &&
                !buscarManutencaoAtiva(
                    veiculo.id
                )

        );

    veiculosDisponiveis.forEach(

        veiculo => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                veiculo.id;

            option.textContent =
                veiculo.placa;

            operationVehicle.appendChild(
                option
            );

        }

    );

    operationDriver.innerHTML = `

        <option value="">Selecione um motorista
        </option>

    `;

    motoristas
        .filter(

            motorista =>
                motorista.ativo

        )
        .forEach(

            motorista => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    motorista.id;

                option.textContent =
                    motorista.nome;

                operationDriver.appendChild(
                    option
                );

            }

        );

}

function aplicarFiltrosOperacao() {

    if (!operationsTable) {

        return;

    }

    const dataSelecionada =
        operationFilterDate
        ?
        operationFilterDate.value
        :
        "";

    const turnoSelecionado =
        operationFilterShift
        ?
        operationFilterShift.value
        :
        "";

    const resultado =
        operacoes.filter(

            operacao => {                
                
                const correspondeData =

                    !dataSelecionada

                    ||

                    operacao.data
                    ===
                    dataSelecionada;

                const correspondeTurno =

                    !turnoSelecionado

                    ||

                    operacao.turno
                    ===
                    turnoSelecionado;

                return (

                    correspondeData

                    &&

                    correspondeTurno

                );

            }

        );

    renderizarOperacoes(
        resultado
    );

}

function renderizarOperacoes(
    lista
) {

    if (!operationsTable) {

        return;

    }

    operationsTable.innerHTML =
        "";

    if (
        lista.length === 0
    ) {

        operationsTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="loading"
                >
                    Nenhum registro encontrado.
                </td>

            </tr>

        `;

        return;

    }

    lista.forEach(

        operacao => {

            const veiculo =
                buscarVeiculo(
                    operacao.veiculo_id
                );

            const motorista =
                buscarMotorista(
                    operacao.motorista_id
                );

            const configuracaoStatus =

                statusOperacao[
                    operacao.status
                ]

                ||

                {
                    texto:
                        operacao.status,

                    classe:
                        "badge-operation"
                };

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `

                <td class="plate">

                    ${
                        veiculo
                        ?
                        veiculo.placa
                        :
                        "—"
                    }

                </td>

                <td>

                    ${
                        motorista
                        ?
                        motorista.nome
                        :
                        "—"
                    }

                </td>

                <td>

                    ${
                        operacao.rota_id
                        ||
                        "—"
                    }

                </td>

                <td>

                    ${
                        operacao.turno
                    }

                </td>

                <td>

                    <span
                        class="
                            badge
                            ${configuracaoStatus.classe}
                        "
                    >

                        ${
                            configuracaoStatus.texto
                        }

                    </span>

                </td>

                <td>

                    <button

                        class="
                            action-button
                            delete-operation
                        "

                        data-operation-id="${operacao.id}"

                        type="button"

                    >

                        Excluir

                    </button>

                </td>

            `;

            operationsTable.appendChild(
                row
            );

        }

    );

}

// NAVEGAÇÃO

function mostrarTela(
    telaAtiva,
    menuAtivo
) {

    const telas = [

        dashboardView,

        fleetView,

        driversView,

        maintenanceView,

        operationsView,

        panoramaView

    ];

    const menus = [

        menuDashboard,

        menuFleet,

        menuDrivers,

        menuMaintenance,

        menuOperations,

        menuPanorama

    ];

    telas.forEach(

        tela => {

            if (tela) {

                tela.classList.remove(
                    "active"
                );

            }

        }

    );

    menus.forEach(

        menu => {

            if (menu) {

                menu.classList.remove(
                    "active"
                );

            }

        }

    );

    if (telaAtiva) {

        telaAtiva.classList.add(
            "active"
        );

    }

    if (menuAtivo) {

        menuAtivo.classList.add(
            "active"
        );

    }

}

menuDashboard?.addEventListener(

    "click",

    () =>

        mostrarTela(

            dashboardView,

            menuDashboard

        )

);

menuDrivers?.addEventListener(

    "click",

    () =>

        mostrarTela(

            driversView,

            menuDrivers

        )

);

menuFleet?.addEventListener(

    "click",

    () => {

        mostrarTela(

            fleetView,

            menuFleet

        );

        aplicarFiltrosFrota();

    }

);

menuMaintenance?.addEventListener(

    "click",

    () =>

        mostrarTela(

            maintenanceView,

            menuMaintenance

        )

);

menuOperations?.addEventListener(

    "click",

    () => {

        mostrarTela(

            operationsView,

            menuOperations

        );

        aplicarFiltrosOperacao();

    }

);

menuPanorama?.addEventListener(

    "click",

    () => {

        mostrarTela(

            panoramaView,

            menuPanorama

        );

    }

);

// BUSCAS E FILTROS

searchInput?.addEventListener(

    "input",

    event => {

        const busca =
            event.target.value
                .trim()
                .toUpperCase();

        renderizarVeiculos(

            veiculos.filter(

                veiculo =>

                    veiculo.placa
                        .toUpperCase()
                        .includes(
                            busca
                        )

            )

        );

    }

);

maintenanceHistorySearch?.addEventListener(

    "input",

    aplicarFiltroHistoricoManutencoes

);

driverSearchInput?.addEventListener(
    "input",
    aplicarFiltrosMotoristas
);

driverStatusFilter?.addEventListener(
    "change",
    aplicarFiltrosMotoristas
);

operationFilterDate?.addEventListener(

    "change",

    aplicarFiltrosOperacao

);

operationFilterShift?.addEventListener(

    "change",

    aplicarFiltrosOperacao

);

fleetSearchInput?.addEventListener(
    "input",
    aplicarFiltrosFrota
);

fleetStatusFilter?.addEventListener(
    "change",
    aplicarFiltrosFrota
);

fleetTypeFilter?.addEventListener(
    "change",
    aplicarFiltrosFrota
);

// AÇÕES DA TABELA DE FROTA

fleetTable?.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {

            return;

        }

        const vehicleId =
            Number(
                button.dataset.vehicleId
            );

        const veiculo =
            buscarVeiculo(
                vehicleId
            );

        if (
            button.classList.contains(
                "fleet-maintenance-button"
            )
        ) {

            abrirModalManutencao();

            maintenanceVehicle.value =
                String(
                    vehicleId
                );

            return;

        }

        if (
            button.classList.contains(
                "go-maintenance"
            )
        ) {

            mostrarTela(

                maintenanceView,

                menuMaintenance

            );

            return;

        }

        if (
            button.classList.contains(
                "edit-vehicle"
            )
        ) {

            if (veiculo) {

                abrirModalEditarVeiculo(
                    veiculo
                );

            }

            return;

        }

        if (
            button.classList.contains(
                "history-vehicle"
            )
        ) {

            await abrirHistoricoVeiculo(
                vehicleId
            );

            return;

        }

        if (
            button.classList.contains(
                "toggle-vehicle"
            )
        ) {

            if (!veiculo) {

                return;

            }

            const acao =
                veiculo.ativo
                ?
                "inativar"
                :
                "reativar";

            const confirmar =
                window.confirm(

                    `Deseja ${acao} o veículo ${veiculo.placa}?`

                );

            if (!confirmar) {

                return;

            }

            try {

                const response =
                    await fetch(

                        `/veiculos/${vehicleId}`,

                        {

                            method:
                                "PATCH",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    ativo:
                                        !veiculo.ativo

                                })

                        }

                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(

                        data.detail

                        ||

                        "Não foi possível atualizar o veículo."

                    );

                }

                await carregarDados();

            } catch (error) {

                alert(
                    error.message
                );

            }

            return;

        }

        if (
            button.classList.contains(
                "delete-vehicle"
            )
        ) {

            if (!veiculo) {

                return;

            }

            const confirmar =
                window.confirm(

                    (
                        `Deseja excluir o veículo ${veiculo.placa}? `
                        +
                        "A exclusão só será permitida se ele não possuir histórico."
                    )

                );

            if (!confirmar) {

                return;

            }

            try {

                const response =
                    await fetch(

                        `/veiculos/${vehicleId}`,

                        {

                            method:
                                "DELETE"

                        }

                    );

                if (!response.ok) {

                    const data =
                        await response.json();

                    throw new Error(

                        data.detail

                        ||

                        "Não foi possível excluir o veículo."

                    );

                }

                await carregarDados();

            } catch (error) {

                alert(
                    error.message
                );

            }

        }

    }

);

// MODAL VEÍCULO

function abrirModalVeiculo() {

    vehicleModal
        .classList
        .add(
            "active"
        );

    vehicleFormMessage.textContent =
        "";

}

function fecharModalVeiculo() {

    vehicleModal
        .classList
        .remove(
            "active"
        );

    vehicleForm.reset();

    vehicleFormMessage.textContent =
        "";

}

openVehicleModal?.addEventListener(
    "click",
    abrirModalVeiculo
);

openFleetVehicleModal?.addEventListener(
    "click",
    abrirModalVeiculo
);

closeVehicleModal?.addEventListener(
    "click",
    fecharModalVeiculo
);

cancelVehicleModal?.addEventListener(
    "click",
    fecharModalVeiculo
);

// CADASTRAR VEÍCULO

vehicleForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        saveVehicleButton.disabled =
            true;

        try {

            const response =
                await fetch(

                    "/veiculos",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                placa:
                                    vehiclePlate.value
                                        .trim()
                                        .toUpperCase(),

                                tipo:
                                    vehicleType.value
                                    ||
                                    null,

                                categoria:
                                    vehicleCategory.value,

                                observacao:
                                    vehicleObservation
                                        ?.value
                                        .trim()
                                    ||
                                    null,

                                ativo:
                                    true

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.detail
                );

            }

            await carregarDados();

            fecharModalVeiculo();

        } catch (error) {

            vehicleFormMessage.textContent =
                error.message;

        }

        finally {

            saveVehicleButton.disabled =
                false;

        }

    }

);

// EDITAR VEÍCULO

function abrirModalEditarVeiculo(
    veiculo
) {

    if (!editVehicleModal) {
                return;

    }

    editVehicleId.value =
        veiculo.id;

    editVehiclePlate.value =
        veiculo.placa;

    garantirOpcaoSelect(

        editVehicleType,

        veiculo.tipo

    );

    editVehicleType.value =
        veiculo.tipo
        ||
        "";

    garantirOpcaoSelect(

        editVehicleCategory,

        veiculo.categoria

    );

    editVehicleCategory.value =veiculo.categoria;

    editVehicleStatus.value =
        String(
            veiculo.ativo
        );

    editVehicleObservation.value =
        veiculo.observacao
        ||
        "";

    editVehicleFormMessage.textContent =
        "";

    editVehicleFormMessage.className =
        "form-message";

    editVehicleModal.classList.add(
        "active"
    );

}

function fecharModalEditarVeiculo() {

    editVehicleModal
        ?.classList
        .remove(
            "active"
        );

    editVehicleForm
        ?.reset();

    if (editVehicleFormMessage) {

        editVehicleFormMessage.textContent =
            "";

        editVehicleFormMessage.className =
            "form-message";

    }

}

closeEditVehicleModal?.addEventListener(

    "click",

    fecharModalEditarVeiculo

);

cancelEditVehicleModal?.addEventListener(

    "click",

    fecharModalEditarVeiculo

);

editVehicleForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        const vehicleId =
            Number(
                editVehicleId.value
            );

        if (!vehicleId) {

            return;

        }

        saveEditVehicleButton.disabled =
            true;

        saveEditVehicleButton.textContent =
            "Salvando...";

        editVehicleFormMessage.textContent =
            "";

        try {

            const response =
                await fetch(

                    `/veiculos/${vehicleId}`,

                    {

                        method:
                            "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                placa:
                                    editVehiclePlate.value
                                        .trim()
                                        .toUpperCase(),

                                tipo:
                                    editVehicleType.value
                                    ||
                                    null,

                                categoria:
                                    editVehicleCategory.value,

                                observacao:
                                    editVehicleObservation.value
                                        .trim()
                                    ||
                                    null,

                                ativo:
                                    editVehicleStatus.value
                                    ===
                                    "true"

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    data.detail

                    ||

                    "Não foi possível atualizar o veículo."

                );

            }

            await carregarDados();

            fecharModalEditarVeiculo();

        } catch (error) {

            editVehicleFormMessage.textContent =
                error.message;

            editVehicleFormMessage.className =
                "form-message error";

        }

        finally {

            saveEditVehicleButton.disabled =
                false;

            saveEditVehicleButton.textContent =
                "Salvar alterações";

        }

    }

);

// HISTÓRICO DO VEÍCULO

function fecharHistoricoVeiculo() {

    vehicleHistoryModal
        ?.classList
        .remove(
            "active"
        );

    if (vehicleHistoryMessage) {

        vehicleHistoryMessage.textContent =
            "";

        vehicleHistoryMessage.className =
            "form-message";

    }

}

async function abrirHistoricoVeiculo(
    vehicleId
) {

    if (!vehicleHistoryModal) {

        return;

    }

    const veiculoLocal =
        buscarVeiculo(
            vehicleId
        );

    vehicleHistoryModal.classList.add(
        "active"
    );

    vehicleHistoryPlate.textContent =
        veiculoLocal
        ?
        veiculoLocal.placa
        :
        "Veículo";

    vehicleHistoryMeta.textContent =
        "Carregando informações...";

    vehicleHistoryOperationsTotal.textContent =
        "--";

    vehicleHistoryMaintenanceTotal.textContent =
        "--";

    vehicleHistoryStatus.textContent =
        "--";

    vehicleHistoryMessage.textContent =
        "";

    vehicleHistoryContent.innerHTML = `

        <p class="loading">
            Carregando histórico...
        </p>

    `;

    try {

        const response =
            await fetch(

                `/veiculos/${vehicleId}/historico`

            );

        const historico =
            await response.json();

        if (!response.ok) {

            throw new Error(

                historico.detail

                ||

                "Não foi possível carregar o histórico."

            );

        }

        const veiculo =
            historico.veiculo;

        const manutencoes =
            historico.manutencoes
            ||
            [];

        const operacoesHistorico =
            historico.operacoes
            ||
            [];

        const veiculoAtual =
            buscarVeiculo(
                veiculo.id
            )
            ||
            veiculo;

        const statusAtual =
            obterStatusVeiculo(
                veiculoAtual
            );

        const statusTexto = {

            DISPONIVEL:
                "Disponível",

            MANUTENCAO:
                "Em manutenção",

            INATIVO:
                "Inativo"

        }[
            statusAtual
        ]
        ||
        statusAtual;

        vehicleHistoryPlate.textContent =
            veiculo.placa;

        vehicleHistoryMeta.textContent =

            [
                veiculo.tipo
                ||
                "Tipo não informado",

                veiculo.categoria

            ]
                .filter(
                    Boolean
                )
                .join(
                    " • "
                );

        vehicleHistoryOperationsTotal.textContent =
            operacoesHistorico.length;

        vehicleHistoryMaintenanceTotal.textContent =
            manutencoes.length;

        vehicleHistoryStatus.textContent =
            statusTexto;

        const eventos = [];

        manutencoes.forEach(

            manutencao => {

                const finalizada =
                    manutencao.status
                    ===
                    "FINALIZADA";

                const custoNumero =
                    Number(
                        manutencao.custo
                    );

                const custoTexto =

                    manutencao.custo
                    !==
                    null

                    &&

                    manutencao.custo
                    !==
                    undefined

                    &&

                    !Number.isNaN(
                        custoNumero
                    )

                    ?

                    custoNumero
                        .toLocaleString(

                            "pt-BR",

                            {

                                style:
                                    "currency",

                                currency:
                                    "BRL"

                            }

                        )

                    :

                    null;

                const detalhes = [

                    `
                        <strong>
                            Motivo:
                        </strong>

                        ${escaparHTML(
                            manutencao.motivo
                        )}
                    `,

                    finalizada
                    &&
                    manutencao.data_retorno

                    ?

                    `
                        <strong>
                            Retorno:
                        </strong>

                        ${formatarData(
                            manutencao.data_retorno
                        )}
                    `

                    :

                    null,

                    manutencao.servico_realizado

                    ?

                    `
                        <strong>
                            Serviço realizado:
                        </strong>

                        ${escaparHTML(
                            manutencao.servico_realizado
                        )}
                    `

                    :

                    null,

                    manutencao.condicao_retorno

                    ?

                    `
                        <strong>
                            Condição:
                        </strong>

                        ${escaparHTML(
                            manutencao.condicao_retorno
                        )}
                    `

                    :

                    null,

                    manutencao.oficina

                    ?

                    `
                        <strong>
                            Oficina:
                        </strong>

                        ${escaparHTML(
                            manutencao.oficina
                        )}
                    `

                    :

                    null,

                    custoTexto

                    ?

                    `
                        <strong>
                            Custo:
                        </strong>

                        ${custoTexto}
                    `

                    :

                    null,

                    manutencao.observacao_retorno

                    ?

                    `
                        <strong>
                            Observação:
                        </strong>

                        ${escaparHTML(
                            manutencao.observacao_retorno
                        )}
                    `

                    :

                    null

                ]
                    .filter(
                        Boolean
                    )
                    .map(

                        detalhe => `

                            <p>
                                ${detalhe}
                            </p>

                        `

                    )
                    .join(
                        ""
                    );

                eventos.push({

                    data:
                        manutencao.data_entrada,

                    ordem:
                        manutencao.id,

                    html: `

                        <article class="vehicle-history-item">

                            <div class="vehicle-history-item-header">

                                <strong>
                                    🛠 ${
                                        finalizada
                                        ?
                                        "Manutenção finalizada"
                                        :
                                        "Manutenção em andamento"
                                    }
                                </strong>

                                <span>
                                    ${formatarData(
                                        manutencao.data_entrada
                                    )}
                                </span>

                            </div>

                            ${detalhes}

                        </article>

                    `

                });

            }

        );

        operacoesHistorico.forEach(

            operacao => {

                const motorista =
                    buscarMotorista(
                        operacao.motorista_id
                    );

                const configuracaoStatus =

                    statusOperacao[
                        operacao.status
                    ]

                    ||

                    {

                        texto:
                            operacao.status

                    };

                const detalhes = [

                    operacao.turno

                    ?

                    `
                        <strong>
                            Turno:
                        </strong>

                        ${escaparHTML(
                            operacao.turno
                        )}
                    `

                    :

                    null,

                    operacao.rota_id

                    ?

                    `
                        <strong>
                            Rota:
                        </strong>

                        ${escaparHTML(
                            operacao.rota_id
                        )}
                    `

                    :

                    null,

                    motorista

                    ?

                    `
                        <strong>
                            Motorista:
                        </strong>

                        ${escaparHTML(
                            motorista.nome
                        )}
                    `

                    :

                    null,

                    operacao.observacao

                    ?

                    `
                        <strong>
                            Observação:
                        </strong>

                        ${escaparHTML(
                            operacao.observacao
                        )}
                    `

                    :

                    null

                ]
                    .filter(
                        Boolean
                    )
                    .map(

                        detalhe => `

                            <p>
                                ${detalhe}
                            </p>

                        `

                    )
                    .join(
                        ""
                    );

                eventos.push({

                    data:
                        operacao.data,

                    ordem:
                        operacao.id,

                    html: `

                        <article class="vehicle-history-item">

                            <div class="vehicle-history-item-header">

                                <strong>
                                    ${escaparHTML(
                                        configuracaoStatus.texto
                                    )}
                                </strong>

                                <span>
                                    ${formatarData(
                                        operacao.data
                                    )}
                                </span>

                            </div>

                            ${detalhes}

                        </article>

                    `

                });

            }

        );

        eventos.sort(

            (
                primeiro,
                segundo
            ) => {

                const comparacaoData =

                    String(
                        segundo.data
                    )
                    .localeCompare(

                        String(
                            primeiro.data
                        )

                    );

                if (
                    comparacaoData
                    !==
                    0
                ) {

                    return comparacaoData;

                }

                return (
                    segundo.ordem
                    -
                    primeiro.ordem
                );

            }

        );

        if (
            eventos.length
            ===
            0
        ) {

            vehicleHistoryContent.innerHTML = `

                <p class="loading">
                    Este veículo ainda não possui histórico.
                </p>

            `;

        }

        else {

            vehicleHistoryContent.innerHTML =

                eventos
                    .map(

                        evento =>
                            evento.html

                    )
                    .join(
                        ""

                    );

        }

    } catch (error) {

        vehicleHistoryMessage.textContent =
            error.message;

        vehicleHistoryMessage.className =
            "form-message error";

        vehicleHistoryContent.innerHTML = `

            <p class="loading">
                Não foi possível carregar o histórico.
            </p>

        `;

    }

}

closeVehicleHistoryModal?.addEventListener(

    "click",

    fecharHistoricoVeiculo

);

closeVehicleHistoryButton?.addEventListener(

    "click",

    fecharHistoricoVeiculo

);

// MOTORISTA

function abrirModalMotorista() {

    driverModal.classList.add(
        "active"
    );

    driverFormMessage.textContent =
        "";

}

function fecharModalMotorista() {

    driverModal.classList.remove(
        "active"
    );

    driverForm.reset();

}

// EDITAR MOTORISTA

function abrirModalEditarMotorista(
    motorista
) {

    if (!editDriverModal) {

        return;

    }

    editDriverId.value =
        motorista.id;

    editDriverName.value =
        motorista.nome;

    editDriverPhone.value =
        motorista.telefone
        ||
        "";

    editDriverObservation.value =
        motorista.observacao
        ||
        "";

    editDriverStatus.value =
        String(
            motorista.ativo
        );

    editDriverFormMessage.textContent =
        "";

    editDriverModal.classList.add(
        "active"
    );

}

function fecharModalEditarMotorista() {

    editDriverModal
        ?.classList
        .remove(
            "active"
        );

    editDriverForm
        ?.reset();

    if (editDriverFormMessage) {

        editDriverFormMessage.textContent =
            "";

    }

}

closeEditDriverModal?.addEventListener(

    "click",

    fecharModalEditarMotorista

);

cancelEditDriverModal?.addEventListener(

    "click",

    fecharModalEditarMotorista

);

editDriverForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        const driverId =
            Number(
                editDriverId.value
            );

        saveEditDriverButton.disabled =
            true;

        saveEditDriverButton.textContent =
            "Salvando...";

        try {

            const response =
                await fetch(

                    `/motoristas/${driverId}`,

                    {

                        method:
                            "PATCH",

                        headers: {

                            "Content-Type":"application/json"

                        },

                        body:
                            JSON.stringify({

                                nome:
                                    editDriverName.value
                                        .trim(),

                                telefone:
                                    editDriverPhone.value
                                        .trim()
                                    ||
                                    null,

                                observacao:
                                    editDriverObservation.value
                                        .trim()
                                    ||
                                    null,

                                ativo:
                                    editDriverStatus.value
                                    ===
                                    "true"

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    data.detail

                    ||

                    "Não foi possível atualizar o motorista."

                );

            }

            await carregarDados();

            fecharModalEditarMotorista();

        } catch (error) {

            editDriverFormMessage.textContent =
                error.message;

            editDriverFormMessage.className =
                "form-message error";

        }

        finally {

            saveEditDriverButton.disabled =
                false;

            saveEditDriverButton.textContent =
                "Salvar alterações";

        }

    }

);

// HISTÓRICO DO MOTORISTA

function fecharHistoricoMotorista() {

    driverHistoryModal
        ?.classList
        .remove(
            "active"
        );

}

async function abrirHistoricoMotorista(
    driverId
) {

    const motoristaLocal =
        buscarMotorista(
            driverId
        );

    driverHistoryModal.classList.add(
        "active"
    );

    driverHistoryName.textContent =
        motoristaLocal
        ?
        motoristaLocal.nome
        :
        "Motorista";

    driverHistoryMeta.textContent =
        "Carregando informações...";

    driverHistoryOperationsTotal.textContent =
        "--";

    driverHistoryVehiclesTotal.textContent =
        "--";

    driverHistoryRoutesTotal.textContent =
        "--";

    driverHistoryLastActivity.textContent =
        "--";

    driverHistoryContent.innerHTML = `

        <p class="loading">
            Carregando histórico...
        </p>

    `;

    try {

        const response =
            await fetch(

                `/motoristas/${driverId}/historico`

            );

        const historico =
            await response.json();

        if (!response.ok) {

            throw new Error(

                historico.detail

                ||

                "Não foi possível carregar o histórico."

            );

        }

        const motorista =
            historico.motorista;

        const operacoesMotorista =
            historico.operacoes
            ||
            [];

        driverHistoryName.textContent =
            motorista.nome;

        driverHistoryMeta.textContent =

            motorista.ativo

            ?

            "Motorista ativo"

            :

            "Motorista inativo";

        driverHistoryOperationsTotal.textContent =
            operacoesMotorista.length;

        const veiculosUtilizados =
            new Set(

                operacoesMotorista

                    .filter(
                        operacao =>
                            operacao.veiculo_id
                    )

                    .map(
                        operacao =>
                            operacao.veiculo_id
                    )

            );

        driverHistoryVehiclesTotal.textContent =
            veiculosUtilizados.size;

        const rotas =
            new Set(

                operacoesMotorista

                    .filter(
                        operacao =>
                            operacao.rota_id
                    )

                    .map(
                        operacao =>
                            operacao.rota_id
                    )

            );

        driverHistoryRoutesTotal.textContent =
            rotas.size;

        const operacoesOrdenadas =
            [
                ...operacoesMotorista
            ].sort(

                (
                    primeiro,
                    segundo
                ) =>

                    String(
                        segundo.data
                    )
                    .localeCompare(
                        String(
                            primeiro.data
                        )
                    )

            );

        driverHistoryLastActivity.textContent =

            operacoesOrdenadas.length

            ?

            formatarData(
                operacoesOrdenadas[0].data
            )

            :

            "Sem registros";

        if (
            operacoesOrdenadas.length
            ===
            0
        ) {

            driverHistoryContent.innerHTML = `

                <p class="loading">
                    Este motorista ainda não possui histórico operacional.
                </p>

            `;

            return;

        }

        driverHistoryContent.innerHTML =

            operacoesOrdenadas
                .map(

                    operacao => {

                        const veiculo =
                            buscarVeiculo(
                                operacao.veiculo_id
                            );

                        const statusConfig =

                            statusOperacao[
                                operacao.status
                            ]

                            ||

                            {

                                texto:
                                    operacao.status

                            };

                        return `

                            <article class="vehicle-history-item">

                                <div class="vehicle-history-item-header">

                                    <strong>

                                        ${escaparHTML(
                                            statusConfig.texto
                                        )}

                                    </strong>

                                    <span>

                                        ${formatarData(
                                            operacao.data
                                        )}

                                    </span>

                                </div>

                                <p>

                                    <strong>
                                        Veículo:
                                    </strong>

                                    ${escaparHTML(
                                        veiculo
                                        ?
                                        veiculo.placa
                                        :
                                        "Não informado"
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Turno:
                                    </strong>

                                    ${escaparHTML(
                                        operacao.turno
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Rota:
                                    </strong>

                                    ${escaparHTML(
                                        operacao.rota_id
                                        ||
                                        "Não informada"
                                    )}

                                </p>

                                ${
                                    operacao.observacao

                                    ?

                                    `

                                        <p>

                                            <strong>
                                                Observação:
                                            </strong>

                                            ${escaparHTML(
                                                operacao.observacao
                                            )}

                                        </p>

                                    `

                                    :

                                    ""
                                }

                            </article>

                        `;

                    }

                )
                .join(
                    ""
                );

    } catch (error) {

        driverHistoryMessage.textContent =
            error.message;

        driverHistoryMessage.className =
            "form-message error";

        driverHistoryContent.innerHTML = `

            <p class="loading">
                Não foi possível carregar o histórico.
            </p>

        `;

    }

}

closeDriverHistoryModal?.addEventListener(

    "click",

    fecharHistoricoMotorista

);

closeDriverHistoryButton?.addEventListener(

    "click",

    fecharHistoricoMotorista

);

openDriverModal?.addEventListener(
    "click",
    abrirModalMotorista
);

closeDriverModal?.addEventListener(
    "click",
    fecharModalMotorista
);

cancelDriverModal?.addEventListener(
    "click",
    fecharModalMotorista
);

driverForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        try {

            const response =
                await fetch(

                    "/motoristas",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                nome:
                                    driverName.value
                                        .trim(),

                                telefone:
                                    driverPhone.value
                                        .trim()
                                    ||
                                    null,

                                observacao:
                                    driverObservation
                                        ?.value
                                        .trim()
                                    ||
                                    null,

                                ativo:
                                    true

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.detail
                );

            }

            await carregarDados();

            fecharModalMotorista();

        } catch (error) {

            driverFormMessage.textContent =
                error.message;

        }

    }

);

// AÇÕES DA TABELA DE MOTORISTAS

driversTable?.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {

            return;

        }

        const driverId =
            Number(
                button.dataset.driverId
            );

        const motorista =
            buscarMotorista(
                driverId
            );

        if (!motorista) {

            return;

        }

        // EDITAR

        if (
            button.classList.contains(
                "edit-driver"
            )
        ) {

            abrirModalEditarMotorista(
                motorista
            );

            return;

        }

        // HISTÓRICO

        if (
            button.classList.contains(
                "history-driver"
            )
        ) {

            await abrirHistoricoMotorista(
                driverId
            );

            return;

        }

        // ATIVAR / INATIVAR

        if (
            button.classList.contains(
                "toggle-driver"
            )
        ) {

            const acao =
                motorista.ativo
                ?
                "inativar"
                :
                "reativar";

            const confirmar =
                window.confirm(

                    `Deseja ${acao} o motorista ${motorista.nome}?`

                );

            if (!confirmar) {

                return;

            }

            try {

                const response =
                    await fetch(

                        `/motoristas/${driverId}`,

                        {

                            method:
                                "PATCH",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    ativo:
                                        !motorista.ativo

                                })

                        }

                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(

                        data.detail

                        ||

                        "Não foi possível atualizar o motorista."

                    );

                }

                await carregarDados();

            } catch (error) {

                alert(
                    error.message
                );

            }

            return;

        }

        // EXCLUIR

        if (
            button.classList.contains(
                "delete-driver"
            )
        ) {

            const confirmar =
                window.confirm(

                    (
                        `Deseja excluir o motorista ${motorista.nome}? `
                        +
                        "A exclusão só será permitida se ele não possuir histórico."
                    )

                );

            if (!confirmar) {

                return;

            }

            try {

                const response =
                    await fetch(

                        `/motoristas/${driverId}`,

                        {

                            method:
                                "DELETE"

                        }

                    );

                if (!response.ok) {

                    const data =
                        await response.json();

                    throw new Error(

                        data.detail

                        ||

                        "Não foi possível excluir o motorista."

                    );

                }

                await carregarDados();

            } catch (error) {

                alert(
                    error.message
                );

            }

        }

    }

);

// MANUTENÇÃO

function abrirModalManutencao() {

    maintenanceEntryDate.value =
        hojeISO();

    maintenanceModal.classList.add(
        "active"
    );

}

function fecharModalManutencao() {

    maintenanceModal.classList.remove(
        "active"
    );

    maintenanceForm.reset();

}

openMaintenanceModal?.addEventListener(
    "click",
    abrirModalManutencao
);

closeMaintenanceModal?.addEventListener(
    "click",
    fecharModalManutencao
);

cancelMaintenanceModal?.addEventListener(
    "click",
    fecharModalManutencao
);

maintenanceForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        try {

            const response =
                await fetch(

                    "/manutencoes",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                veiculo_id:
                                    Number(
                                        maintenanceVehicle.value
                                    ),

                                motivo:
                                    maintenanceReason.value
                                        .trim(),

                                data_entrada:
                                    maintenanceEntryDate.value,

                                previsao_retorno:
                                    maintenanceReturnDate.value
                                    ||
                                    null

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.detail
                );

            }

            await carregarDados();

            fecharModalManutencao();

        } catch (error) {

            maintenanceFormMessage.textContent =
                error.message;

        }

    }

);

// AÇÕES DAS MANUTENÇÕES

maintenanceTable?.addEventListener(

    "click",

    event => {

        const finishButton =
            event.target.closest(
                ".finish-maintenance"
            );

        if (finishButton) {

            const maintenanceId =
                Number(
                    finishButton.dataset.maintenanceId
                );

            abrirModalFinalizarManutencao(
                maintenanceId
            );

            return;

        }

        const detailsButton =
            event.target.closest(
                ".view-maintenance-details"
            );

        if (detailsButton) {

            abrirDetalhesManutencao(

                Number(
                    detailsButton.dataset.maintenanceId
                ),

                detailsButton.dataset.maintenanceSource

            );

        }

    }

);

maintenanceHistoryTable?.addEventListener(

    "click",

    event => {

        const button =
            event.target.closest(
                ".view-maintenance-details"
            );

        if (!button) {

            return;

        }

        abrirDetalhesManutencao(

            Number(
                button.dataset.maintenanceId
            ),

            button.dataset.maintenanceSource

        );

    }

);

function abrirModalFinalizarManutencao(
    maintenanceId
) {

    const manutencao =
        manutencoesAtivas.find(

            item =>
                item.id
                ===
                maintenanceId

        );

    if (!manutencao) {

        return;

    }

    const veiculo =
        buscarVeiculo(manutencao.veiculo_id
        );

    finishMaintenanceId.value =
        manutencao.id;

    finishMaintenanceVehicleInfo.textContent =

        veiculo

        ?

        `${veiculo.placa} • ${manutencao.motivo}`

        :

        manutencao.motivo;

    finishMaintenanceReturnDate.value =
        hojeISO();

    finishMaintenanceMessage.textContent =
        "";

    finishMaintenanceModal.classList.add(
        "active"
    );

}

function fecharModalFinalizarManutencao() {

    finishMaintenanceModal
        ?.classList
        .remove(
            "active"
        );

    finishMaintenanceForm
        ?.reset();

    if (finishMaintenanceMessage) {

        finishMaintenanceMessage.textContent =
            "";

    }

}

closeFinishMaintenanceModal?.addEventListener(

    "click",

    fecharModalFinalizarManutencao

);

cancelFinishMaintenanceModal?.addEventListener(

    "click",

    fecharModalFinalizarManutencao

);

finishMaintenanceForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        const maintenanceId =
            Number(
                finishMaintenanceId.value
            );

        saveFinishMaintenanceButton.disabled =
            true;

        saveFinishMaintenanceButton.textContent =
            "Finalizando...";

        try {

            const response =
                await fetch(

                    `/manutencoes/${maintenanceId}/finalizar`,

                    {

                        method:
                            "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                data_retorno:
                                    finishMaintenanceReturnDate.value,

                                servico_realizado:
                                    finishMaintenanceService.value
                                        .trim()
                                    ||
                                    null,

                                condicao_retorno:
                                    finishMaintenanceCondition.value
                                    ||
                                    null,

                                oficina:
                                    finishMaintenanceWorkshop.value
                                        .trim()
                                    ||
                                    null,

                                custo:
                                    finishMaintenanceCost.value

                                    ?

                                    Number(
                                        finishMaintenanceCost.value
                                    )

                                    :

                                    null,

                                observacao_retorno:
                                    finishMaintenanceObservation.value
                                        .trim()
                                    ||
                                    null

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    data.detail

                    ||

                    "Não foi possível finalizar a manutenção."

                );

            }

            await carregarDados();

            fecharModalFinalizarManutencao();

        } catch (error) {

            finishMaintenanceMessage.textContent =
                error.message;

            finishMaintenanceMessage.className =
                "form-message error";

        }

        finally {

            saveFinishMaintenanceButton.disabled =
                false;

            saveFinishMaintenanceButton.textContent =
                "Finalizar manutenção";

        }

    }

);

function fecharDetalhesManutencao() {

    maintenanceDetailsModal
        ?.classList
        .remove(
            "active"
        );

}

function abrirDetalhesManutencao(
    maintenanceId,
    origem
) {

    const lista =

        origem
        ===
        "finished"

        ?

        manutencoesFinalizadas

        :

        manutencoesAtivas;

    const manutencao =
        lista.find(

            item =>
                item.id
                ===
                maintenanceId

        );

    if (!manutencao) {

        return;

    }

    const veiculo =
        buscarVeiculo(
            manutencao.veiculo_id
        );

    maintenanceDetailsVehicle.textContent =

        veiculo
        ?
        veiculo.placa
        :
        "Veículo";

    maintenanceDetailsPeriod.textContent =

        manutencao.data_retorno

        ?

        `${formatarData(
            manutencao.data_entrada
        )} até ${formatarData(
            manutencao.data_retorno
        )}`

        :

        `Entrada em ${formatarData(
            manutencao.data_entrada
        )}`;

    const custoNumero =
        Number(
            manutencao.custo
        );

    const custo =

        manutencao.custo
        !==
        null

        &&

        manutencao.custo
        !==
        undefined

        &&

        !Number.isNaN(
            custoNumero
        )

        ?

        custoNumero.toLocaleString(

            "pt-BR",

            {

                style:
                    "currency",

                currency:
                    "BRL"

            }

        )

        :

        "Não informado";

    maintenanceDetailsContent.innerHTML = `

        <div class="maintenance-detail-grid">

            <div>

                <span>
                    Motivo
                </span>

                <strong>
                    ${escaparHTML(
                        manutencao.motivo
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Status
                </span>

                <strong>
                    ${escaparHTML(
                        manutencao.status
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Entrada
                </span>

                <strong>
                    ${formatarData(
                        manutencao.data_entrada
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Previsão de retorno
                </span>

                <strong>
                    ${formatarData(
                        manutencao.previsao_retorno
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Retorno
                </span>

                <strong>
                    ${formatarData(
                        manutencao.data_retorno
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Condição
                </span>

                <strong>
                    ${escaparHTML(
                        manutencao.condicao_retorno
                        ||
                        "Não informada"
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Oficina
                </span>

                <strong>
                    ${escaparHTML(
                        manutencao.oficina
                        ||
                        "Não informada"
                    )}
                </strong>

            </div>

            <div>

                <span>
                    Custo
                </span>

                <strong>
                    ${custo}
                </strong>

            </div>

        </div>

        <div class="maintenance-detail-text">

            <h4>
                Serviço realizado
            </h4>

            <p>
                ${escaparHTML(
                    manutencao.servico_realizado
                    ||
                    "Não informado"
                )}
            </p>

        </div>

        <div class="maintenance-detail-text">

            <h4>
                Observação de retorno
            </h4>

            <p>
                ${escaparHTML(
                    manutencao.observacao_retorno
                    ||
                    "Nenhuma observação registrada"
                )}
            </p>

        </div>

    `;

    maintenanceDetailsModal.classList.add(
        "active"
    );

}

closeMaintenanceDetailsModal?.addEventListener(

    "click",

    fecharDetalhesManutencao

);

closeMaintenanceDetailsButton?.addEventListener(

    "click",

    fecharDetalhesManutencao

);

// MODAL OPERAÇÃO

function abrirModalOperacao() {

    operationDate.value =
        operationFilterDate.value
        ||
        hojeISO();

    operationModal.classList.add(
        "active"
    );

    operationFormMessage.textContent =
        "";

}

function fecharModalOperacao() {

    operationModal.classList.remove(
        "active"
    );

    operationForm.reset();

}

openOperationModal?.addEventListener(
    "click",
    abrirModalOperacao
);

closeOperationModal?.addEventListener(
    "click",
    fecharModalOperacao
);

cancelOperationModal?.addEventListener(
    "click",
    fecharModalOperacao
);

// CADASTRAR OPERAÇÃO

operationForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        saveOperationButton.disabled =
            true;

        saveOperationButton.textContent =
            "Registrando...";

        try {

            const response =
                await fetch(

                    "/operacoes",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                data:
                                    operationDate.value,

                                turno:
                                    operationShift.value,

                                veiculo_id:
                                    operationVehicle.value
                                    ?
                                    Number(
                                        operationVehicle.value
                                    )
                                    :
                                    null,

                                motorista_id:
                                    operationDriver.value
                                    ?
                                    Number(
                                        operationDriver.value
                                    )
                                    :
                                    null,

                                rota_id:
                                    operationRoute.value
                                        .trim()
                                    ||
                                    null,

                                status:
                                    operationStatus.value,

                                observacao:
                                    operationObservation.value
                                        .trim()
                                    ||
                                    null,

                                origem:
                                    "MANUAL"

                            })

                    }

                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    data.detail

                    ||

                    "Erro ao registrar operação."

                );

            }

            await carregarDados();

            fecharModalOperacao();

        } catch (error) {

            operationFormMessage.textContent =
                error.message;

            operationFormMessage.className =
                "form-message error";

        }

        finally {

            saveOperationButton.disabled =
                false;

            saveOperationButton.textContent =
                "Registrar operação";

        }

    }

);

// EXCLUIR OPERAÇÃO

operationsTable?.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                ".delete-operation"
            );

        if (!button) {

            return;

        }

        const confirmar =
            window.confirm(

                "Deseja excluir este registro da operação?"

            );

        if (!confirmar) {

            return;

        }

        const response =
            await fetch(

                `/operacoes/${button.dataset.operationId}`,

                {

                    method:
                        "DELETE"

                }

            );

        if (!response.ok) {

            alert(
                "Não foi possível excluir o registro."
            );

            return;

        }

        await carregarDados();

    }

);

// PANORAMA

async function gerarPanorama() {

    const data =
        panoramaDate.value;

    const turno =
        panoramaShift.value;

    if (!data) {

        panoramaMessage.textContent =
            "Selecione a data do panorama.";

        panoramaMessage.className =
            "form-message error";

        return;

    }

    generatePanoramaButton.disabled =
        true;

    generatePanoramaButton.textContent =
        "Gerando...";

    panoramaMessage.textContent =
        "";

    try {

        const parametros =
            new URLSearchParams();

        parametros.set(

            "data_operacao",

            data

        );

        if (turno) {

            parametros.set(

                "turno",

                turno

            );

        }

        const response =
            await fetch(

                `/panorama?${parametros.toString()}`

            );

        const resultado =
            await response.json();

        if (!response.ok) {

            throw new Error(

                resultado.detail

                ||

                "Não foi possível gerar o panorama."

            );

        }

        panoramaText.textContent =
            resultado.texto;

        panoramaTotalVehicles.textContent =
            resultado.total_veiculos;

        panoramaMaintenance.textContent =
            resultado.veiculos_manutencao;

        panoramaOperations.textContent =
            resultado.veiculos_operacao;

        copyPanoramaButton.disabled =
            false;

        panoramaMessage.textContent =
            "Panorama gerado com sucesso.";

        panoramaMessage.className =
            "form-message success";

    } catch (error) {

        panoramaMessage.textContent =
            error.message;

        panoramaMessage.className =
            "form-message error";

    } finally {

        generatePanoramaButton.disabled =
            false;

        generatePanoramaButton.textContent =
            "Gerar panorama";

    }

}

generatePanoramaButton?.addEventListener(

    "click",

    gerarPanorama

);

async function copiarPanorama() {

    const texto =
        panoramaText.textContent;

    if (!texto) {

        return;

    }

    try {

        await navigator.clipboard.writeText(
            texto
        );

        panoramaMessage.textContent =
            "Panorama copiado. Agora é só colar no WhatsApp.";

        panoramaMessage.className =
            "form-message success";

        copyPanoramaButton.textContent =
            "✓ Copiado";

        setTimeout(

            () => {

                copyPanoramaButton.textContent =
                    "Copiar texto";

            },

            1800

        );

    } catch (error) {

        panoramaMessage.textContent =
            "Não foi possível copiar automaticamente.";

        panoramaMessage.className =
            "form-message error";

    }

}

copyPanoramaButton?.addEventListener(

    "click",

    copiarPanorama

);

// FECHAR MODAIS CLICANDO FORA

const modais = [

    [
        vehicleModal,
        fecharModalVeiculo
    ],

    [
        editVehicleModal,
        fecharModalEditarVeiculo
    ],

    [
        vehicleHistoryModal,
        fecharHistoricoVeiculo
    ],

    [
    editDriverModal,
    fecharModalEditarMotorista
    ],

    [
        driverHistoryModal,
        fecharHistoricoMotorista
    ],

    [
        driverModal,
        fecharModalMotorista
    ],

    [
        maintenanceModal,
        fecharModalManutencao
    ],

    [
    finishMaintenanceModal,
    fecharModalFinalizarManutencao
    ],

    [
        maintenanceDetailsModal,
        fecharDetalhesManutencao
    ],

    [
        operationModal,
        fecharModalOperacao
    ]

];

modais.forEach(

    ([
        modal,
        fechar
    ]) => {

        modal?.addEventListener(

            "click",

            event => {

                if (
                    event.target
                    ===
                    modal
                ) {

                    fechar();

                }

            }
        );

    }

);

// ESC FECHA MODAIS

document.addEventListener(

    "keydown",

    event => {

        if (
            event.key
            !==
            "Escape"
        ) {

            return;

        }

        fecharModalVeiculo();

        fecharModalEditarVeiculo();

        fecharHistoricoVeiculo();

        fecharModalMotorista();

        fecharModalEditarMotorista();

        fecharHistoricoMotorista();

        fecharModalManutencao();

        fecharModalFinalizarManutencao();

        fecharDetalhesManutencao();

        fecharModalOperacao();

    }

);

// INICIALIZAÇÃO

if (operationFilterDate) {

    operationFilterDate.value =
        hojeISO();

}

if (panoramaDate) {

    panoramaDate.value =
        hojeISO();

}

// SINCRONIZAÇÃO AUTOMÁTICA

function atualizarStatusSincronizacao(
    dados
) {

    if (
        !syncStatusCard
        ||
        !syncOperationButton
    ) {

        return;

    }


    const statusAtual =
        dados.status
        ||
        "DESCONHECIDO";


    const configuracoes = {

        SOLICITADO: {
            titulo:
                "Iniciando sincronização",

            icone:
                "🔄"
        },


        INICIANDO: {
            titulo:
                "Abrindo coletor",

            icone:
                "🔄"
        },


        AGUARDANDO_PAGINA: {
            titulo:
                "Aguardando página operacional",

            icone:
                "🔄"
        },


        COLETANDO: {
            titulo:
                "Coletando dados",

            icone:
                "🔄"
        },


        PROCESSANDO: {
            titulo:
                "Processando dados",

            icone:
                "🔄"
        },


        ENVIANDO: {
            titulo:
                "Atualizando o Hawk",

            icone:
                "🔄"
        },


        CONCLUIDO: {
            titulo:
                "Sincronização concluída",

            icone:
                "✅"
        },


        SEM_REGISTROS: {
            titulo:
                "Nenhum registro encontrado",

            icone:
                "⚠️"
        },


        ERRO: {
            titulo:
                "Erro na sincronização",

            icone:
                "❌"
        },


        PARADO: {
            titulo:
                "Coletor parado",

            icone:
                "⏸️"
        }

    };


    const configuracao =

        configuracoes[
            statusAtual
        ]

        ||

        {
            titulo:
                "Sincronização",

            icone:
                "🔄"
        };


    syncStatusCard.hidden =
        false;


    syncStatusCard.dataset.status =
        statusAtual;


    syncStatusTitle.textContent =
        configuracao.titulo;


    syncStatusIcon.textContent =
        configuracao.icone;


    syncStatusMessage.textContent =

        dados.mensagem

        ||

        "Aguardando informações do coletor.";


    const statusEmAndamento = [

        "SOLICITADO",

        "INICIANDO",

        "AGUARDANDO_PAGINA",

        "COLETANDO",

        "PROCESSANDO",

        "ENVIANDO"

    ].includes(
        statusAtual
    );


    const processoAtivo =

        typeof dados.processo_ativo === "boolean"

        ?

        dados.processo_ativo

        :

        statusEmAndamento;


    syncOperationButton.disabled =
        processoAtivo;


    syncOperationButton.textContent =

        processoAtivo

        ?

        "🔄 Sincronizando..."

        :

        "🔄 Sincronizar operação";


    syncStatusCard.classList.toggle(

        "sync-active",

        statusEmAndamento

    );

}


// CONSULTAR STATUS

async function consultarStatusColetor() {

    try {

        const response =
            await fetch(
                "/coleta/status"
            );


        if (!response.ok) {

            throw new Error(
                "Não foi possível consultar o coletor."
            );

        }


        const dados =
            await response.json();


        atualizarStatusSincronizacao(
            dados
        );


        // SINCRONIZAÇÃO FINALIZADA

        if (
            dados.status
            ===
            "CONCLUIDO"
        ) {

            const identificador =

                dados.atualizado_em

                ||

                "concluido";


            if (

                ultimaSincronizacaoConcluida

                !==

                identificador

            ) {

                ultimaSincronizacaoConcluida =
                    identificador;


                await carregarDados();

            }

        }


        // PARAR MONITORAMENTO

        const terminou = [

            "CONCLUIDO",

            "ERRO",

            "SEM_REGISTROS"

        ].includes(
            dados.status
        );


        if (
            terminou
            &&
            syncStatusInterval
        ) {

            clearInterval(
                syncStatusInterval
            );


            syncStatusInterval =
                null;

        }


        return dados;


    } catch (error) {

        console.error(

            "Erro ao consultar status do coletor:",

            error

        );


        atualizarStatusSincronizacao({

            status:
                "ERRO",

            mensagem:
                error.message,

            processo_ativo:
                false

        });


        return null;

    }

}


// MONITORAR COLETOR

function iniciarMonitoramentoColetor() {

    if (
        syncStatusInterval
    ) {

        clearInterval(
            syncStatusInterval
        );

    }


    consultarStatusColetor();


    syncStatusInterval =
        setInterval(

            consultarStatusColetor,

            2000

        );

}


// INICIAR SINCRONIZAÇÃO

syncOperationButton?.addEventListener(

    "click",

    async () => {


        const dataOperacao =

            operationFilterDate.value

            ||

            hojeISO();


        const turno =

            operationFilterShift.value;


        // VALIDAR TURNO

        if (!turno) {

            atualizarStatusSincronizacao({

                status:
                    "ERRO",

                mensagem:
                    (
                        "Selecione Manhã, Tarde ou Noite "
                        +
                        "antes de iniciar a sincronização."
                    ),

                processo_ativo:
                    false

            });


            return;

        }


        syncOperationButton.disabled =
            true;


        syncOperationButton.textContent =
            "🔄 Iniciando...";


        atualizarStatusSincronizacao({

            status:
                "SOLICITADO",

            mensagem:
                (
                    "Solicitando abertura "
                    +
                    "do coletor..."
                ),

            processo_ativo:
                true

        });


        try {

            const parametros =
                new URLSearchParams({

                    turno:
                        turno,

                    data_operacao:
                        dataOperacao

                });


            const response =
                await fetch(

                    (
                        "/coleta/iniciar?"
                        +
                        parametros.toString()
                    ),

                    {

                        method:
                            "POST"

                    }

                );


            const dados =
                await response.json();


            if (!response.ok) {

                throw new Error(

                    dados.detail

                    ||

                    "Não foi possível iniciar a sincronização."

                );

            }


            iniciarMonitoramentoColetor();


        } catch (error) {


            atualizarStatusSincronizacao({

                status:
                    "ERRO",

                mensagem:
                    error.message,

                processo_ativo:
                    false

            });

        }

    }

);

carregarDados();

consultarStatusColetor()
    .then(
        dados => {

            if (
                dados
                &&
                dados.processo_ativo
            ) {

                iniciarMonitoramentoColetor();

            }

        }
    );
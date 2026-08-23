// YLUME OPS

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

const sidebarFleetCount =
    document.getElementById("sidebarFleetCount");

const sidebarDriversCount =
    document.getElementById("sidebarDriversCount");

const sidebarHelpersCount =
    document.getElementById("sidebarHelpersCount");

const sidebarMaintenanceCount =
    document.getElementById("sidebarMaintenanceCount");

const sidebarOperationsCount =
    document.getElementById("sidebarOperationsCount");

const dashboardDriversActive =
    document.getElementById("dashboardDriversActive");

const dashboardOpsTodayStrip =
    document.getElementById("dashboardOpsTodayStrip");

const dashboardAvailabilityRate =
    document.getElementById("dashboardAvailabilityRate");

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

const menuHelpers =
    document.getElementById("menuHelpers");

const menuMaintenance =
    document.getElementById("menuMaintenance");

const menuOperations =
    document.getElementById("menuOperations");

const menuPanorama =
    document.getElementById("menuPanorama");

const logoutButton =
    document.getElementById("logout-button");

const dashboardView =
    document.getElementById("dashboardView");

const fleetView =
    document.getElementById("fleetView");

const driversView =
    document.getElementById("driversView");

const helpersView =
    document.getElementById("helpersView");

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

const deleteVehicleFromModal =
    document.getElementById("deleteVehicleFromModal");

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

const driverCpf =
    document.getElementById("driverCpf");

const driverPhone =
    document.getElementById("driverPhone");

const driverCnh =
    document.getElementById("driverCnh");

const driverCnhCategory =
    document.getElementById("driverCnhCategory");

const driverCnhExpiry =
    document.getElementById("driverCnhExpiry");

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

const editDriverCpf =
    document.getElementById("editDriverCpf");

const editDriverPhone =
    document.getElementById("editDriverPhone");

const editDriverCnh =
    document.getElementById("editDriverCnh");

const editDriverCnhCategory =
    document.getElementById("editDriverCnhCategory");

const editDriverCnhExpiry =
    document.getElementById("editDriverCnhExpiry");

const editDriverObservation =
    document.getElementById("editDriverObservation");

const editDriverStatus =
    document.getElementById("editDriverStatus");

const editDriverFormMessage =
    document.getElementById("editDriverFormMessage");

const saveEditDriverButton =
    document.getElementById("saveEditDriverButton");

const deleteDriverFromModal =
    document.getElementById("deleteDriverFromModal");


async function excluirMotorista(
    driverId,
    motorista
) {
    if (!driverId || !motorista) {
        return;
    }

    const confirmar = await confirmarAcao(
        `Deseja excluir ${motorista.nome} da base? Se houver histórico operacional, o Ylume Ops oferecerá a opção de arquivar o cadastro sem apagar os registros anteriores.`,
        {
            titulo: "Excluir motorista",
            confirmarTexto: "Excluir",
            perigo: true
        }
    );

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(
            `/motoristas/${driverId}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            fecharModalEditarMotorista();
            await carregarDados();
            mostrarToast("Motorista excluído com sucesso.", "success");
            return;
        }

        const data = await response.json();

        if (response.status === 409) {
            const arquivar = await confirmarAcao(
                "Este motorista possui histórico operacional. Para preservar os registros anteriores, você pode arquivar o cadastro. Ele deixará de aparecer na visão padrão e poderá ser reativado depois.",
                {
                    eyebrow: "HISTÓRICO PRESERVADO",
                    titulo: "Arquivar motorista?",
                    confirmarTexto: "Arquivar motorista"
                }
            );

            if (!arquivar) {
                return;
            }

            const responseArquivar = await fetch(
                `/motoristas/${driverId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ativo: false })
                }
            );

            if (!responseArquivar.ok) {
                const erro = await responseArquivar.json();
                throw new Error(
                    erro.detail || "Não foi possível arquivar o motorista."
                );
            }

            fecharModalEditarMotorista();
            await carregarDados();
            mostrarToast("Motorista arquivado. O histórico foi preservado.", "success");
            return;
        }

        throw new Error(
            data.detail || "Não foi possível excluir o motorista."
        );
    } catch (error) {
        mostrarToast(error.message);
    }
}


deleteDriverFromModal?.addEventListener(
    "click",
    async () => {

        const driverId =
            Number(editDriverId.value);

        await excluirMotorista(
            driverId,
            buscarMotorista(driverId)
        );

    }
);


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

// ELEMENTOS - AJUDANTES

const helpersTable = document.getElementById("helpersTable");
const helpersRegistered = document.getElementById("helpersRegistered");
const helpersActive = document.getElementById("helpersActive");
const helpersInactive = document.getElementById("helpersInactive");
const helpersOperationsToday = document.getElementById("helpersOperationsToday");
const helperSearchInput = document.getElementById("helperSearchInput");
const helperStatusFilter = document.getElementById("helperStatusFilter");
const openHelperModal = document.getElementById("openHelperModal");
const helperModal = document.getElementById("helperModal");
const closeHelperModal = document.getElementById("closeHelperModal");
const cancelHelperModal = document.getElementById("cancelHelperModal");
const helperForm = document.getElementById("helperForm");
const helperName = document.getElementById("helperName");
const helperCpf = document.getElementById("helperCpf");
const helperPhone = document.getElementById("helperPhone");
const helperObservation = document.getElementById("helperObservation");
const helperFormMessage = document.getElementById("helperFormMessage");
const editHelperModal = document.getElementById("editHelperModal");
const closeEditHelperModal = document.getElementById("closeEditHelperModal");
const cancelEditHelperModal = document.getElementById("cancelEditHelperModal");
const editHelperForm = document.getElementById("editHelperForm");
const editHelperId = document.getElementById("editHelperId");
const editHelperName = document.getElementById("editHelperName");
const editHelperCpf = document.getElementById("editHelperCpf");
const editHelperPhone = document.getElementById("editHelperPhone");
const editHelperObservation = document.getElementById("editHelperObservation");
const editHelperStatus = document.getElementById("editHelperStatus");
const editHelperFormMessage = document.getElementById("editHelperFormMessage");
const deleteHelperFromModal = document.getElementById("deleteHelperFromModal");

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

const operationHelper =
    document.getElementById("operationHelper");

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

// IMPORTAÇÃO INTELIGENTE

const openImportOperationModal =
    document.getElementById(
        "openImportOperationModal"
    );

const importOperationModal =
    document.getElementById(
        "importOperationModal"
    );

const closeImportOperationModal =
    document.getElementById(
        "closeImportOperationModal"
    );

const cancelImportOperationModal =
    document.getElementById(
        "cancelImportOperationModal"
    );


const importModeTabs = Array.from(document.querySelectorAll("[data-import-mode]"));
const importModePanels = Array.from(document.querySelectorAll("[data-import-panel]"));
const smartImportDate = document.getElementById("smartImportDate");
const smartImportShift = document.getElementById("smartImportShift");
const smartImportImages = document.getElementById("smartImportImages");
const smartImportImageList = document.getElementById("smartImportImageList");
const smartImportFiles = document.getElementById("smartImportFiles");
const smartImportFileList = document.getElementById("smartImportFileList");
const smartImportText = document.getElementById("smartImportText");
const smartImportUseAi = document.getElementById("smartImportUseAi");
const smartImportAnalyzeButton = document.getElementById("smartImportAnalyzeButton");
const smartImportMessage = document.getElementById("smartImportMessage");
const smartImportPreview = document.getElementById("smartImportPreview");
const smartImportPreviewBody = document.getElementById("smartImportPreviewBody");
const smartImportPreviewCount = document.getElementById("smartImportPreviewCount");
const smartImportSummary = document.getElementById("smartImportSummary");
const smartImportConfirmButton = document.getElementById("smartImportConfirmButton");
const smartImportBackButton = document.getElementById("smartImportBackButton");
const smartImportOverwriteManual = document.getElementById("smartImportOverwriteManual");
const smartImportReviewOnlyButton = document.getElementById("smartImportReviewOnlyButton");
const smartImportReviewCount = document.getElementById("smartImportReviewCount");
const smartImportReadyCount = document.getElementById("smartImportReadyCount");
const importAiStatus = document.getElementById("importAiStatus");
let smartImportMode = "image";
let smartImportRecords = [];
let smartImportReviewOnly = false;

// ELEMENTOS - VEÍCULOS SEM CLASSIFICAÇÃO

const unclassifiedVehiclesPanel =
    document.getElementById(
        "unclassifiedVehiclesPanel"
    );

const unclassifiedVehiclesTotal =
    document.getElementById(
        "unclassifiedVehiclesTotal"
    );

const unclassifiedVehiclesMessage =
    document.getElementById(
        "unclassifiedVehiclesMessage"
    );

const unclassifiedVehiclesTable =
    document.getElementById(
        "unclassifiedVehiclesTable"
    );

const classifyVehicleModal =
    document.getElementById(
        "classifyVehicleModal"
    );

const classifyVehicleForm =
    document.getElementById(
        "classifyVehicleForm"
    );

const classifyVehicleId =
    document.getElementById(
        "classifyVehicleId"
    );

const classifyVehiclePlate =
    document.getElementById(
        "classifyVehiclePlate"
    );

const classifyVehicleMeta =
    document.getElementById(
        "classifyVehicleMeta"
    );

const classifyVehicleType =
    document.getElementById(
        "classifyVehicleType"
    );

const classifyVehicleReason =
    document.getElementById(
        "classifyVehicleReason"
    );

const classifyVehicleReturnDateGroup =
    document.getElementById(
        "classifyVehicleReturnDateGroup"
    );

const classifyVehicleReturnDate =
    document.getElementById(
        "classifyVehicleReturnDate"
    );

const classifyVehicleMessage =
    document.getElementById(
        "classifyVehicleMessage"
    );

const closeClassifyVehicleModal =
    document.getElementById(
        "closeClassifyVehicleModal"
    );

const cancelClassifyVehicleModal =
    document.getElementById(
        "cancelClassifyVehicleModal"
    );

const saveClassifyVehicleButton =
    document.getElementById(
        "saveClassifyVehicleButton"
    );

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

const panoramaIdle = document.getElementById("panoramaIdle");
const panoramaUnit = document.getElementById("panoramaUnit");
const panoramaOperator = document.getElementById("panoramaOperator");
const savePanoramaConfigButton = document.getElementById("savePanoramaConfigButton");

// DADOS

let veiculos = [];

let manutencoesAtivas = [];

let manutencoesFinalizadas = [];

let motoristas = [];

let ajudantes = [];

let operacoes = [];

let veiculosSemClassificacao = [];

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
        texto: "Carregando",
        classe: "badge-operation"
    },

    EM_ROTA: {
        texto: "Em rota",
        classe: "badge-operation"
    },

    CONCLUIDA: {
        texto: "Concluída",
        classe: "badge-active"
    },

    RETORNANDO_ESTACAO: {
        texto: "Retornando à estação",
        classe: "badge-maintenance"
    },

    AMBULANCIA: {
        texto: "Ambulância entre paradas",
        classe: "badge-inactive"
    },

    RESERVA_CARREGANDO: {
        texto: "Reserva / Carregando",
        classe: "badge-operation"
    },

    FOLGA: {
        texto: "Folga",
        classe: "badge-maintenance"
    },

    IMPEDIDO: {
        texto: "Impedido",
        classe: "badge-inactive"
    },

    SEM_CARGA: {
        texto: "Sem carga",
        classe: "badge-operation"
    },

    OUTRO_SERVICE: {
        texto: "Outro serviço",
        classe: "badge-operation"
    },

    INDISPONIVEL_MOTORISTA: {
        texto: "Indisponível / Motorista",
        classe: "badge-inactive"
    },

    SEM_CLASSIFICACAO: {
        texto: "Sem classificação",
        classe: "badge-maintenance"
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

function somenteDigitos(valor) {
    return String(valor ?? "").replace(/\D/g, "");
}

function formatarCPF(valor) {
    const digitos = somenteDigitos(valor).slice(0, 11);

    if (!digitos) {
        return "";
    }

    return digitos
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarCpfTabela(valor) {
    const digitos = somenteDigitos(valor);

    if (digitos.length !== 11) {
        return "Não informado";
    }

    return `***.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-**`;
}

function situacaoCnh(motorista) {
    const validade = motorista.validade_cnh;

    if (!motorista.cnh && !validade) {
        return {
            texto: "Não informada",
            classe: "cnh-neutral"
        };
    }

    if (!validade) {
        return {
            texto: motorista.categoria_cnh
                ? `Cat. ${motorista.categoria_cnh}`
                : "Sem validade informada",
            classe: "cnh-neutral"
        };
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataValidade = new Date(`${validade}T00:00:00`);
    const dias = Math.ceil((dataValidade - hoje) / 86400000);

    if (dias < 0) {
        return {
            texto: `Vencida em ${formatarData(validade)}`,
            classe: "cnh-expired"
        };
    }

    if (dias <= 30) {
        return {
            texto: `Vence em ${dias} dia${dias === 1 ? "" : "s"}`,
            classe: "cnh-warning"
        };
    }

    return {
        texto: `Válida até ${formatarData(validade)}`,
        classe: "cnh-valid"
    };
}

function mostrarToast(mensagem, tipo = "error") {
    const stack = document.getElementById("toastStack");

    if (!stack) {
        console.log(mensagem);
        return;
    }

    const toast = document.createElement("div");
    toast.className = `app-toast app-toast-${tipo}`;

    const icone = tipo === "success" ? "check-circle-2" : "circle-alert";

    toast.innerHTML = `
        <i data-lucide="${icone}"></i>
        <span>${escaparHTML(mensagem)}</span>
    `;

    stack.appendChild(toast);
    window.lucide?.createIcons();

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 220);
    }, 4200);
}

function confirmarAcao(mensagem, opcoes = {}) {
    const overlay = document.getElementById("actionDialog");
    const titulo = document.getElementById("actionDialogTitle");
    const texto = document.getElementById("actionDialogMessage");
    const confirmar = document.getElementById("actionDialogConfirm");
    const cancelar = document.getElementById("actionDialogCancel");
    const eyebrow = document.getElementById("actionDialogEyebrow");

    if (!overlay || !confirmar || !cancelar) {
        return Promise.resolve(window.confirm(mensagem));
    }

    titulo.textContent = opcoes.titulo || "Confirmar ação";
    texto.textContent = mensagem;
    eyebrow.textContent = opcoes.eyebrow || "CONFIRMAÇÃO";
    confirmar.textContent = opcoes.confirmarTexto || "Confirmar";
    confirmar.className = opcoes.perigo
        ? "danger-button"
        : "primary-button";

    overlay.classList.add("active");
    document.body.classList.add("modal-open");

    return new Promise(resolve => {
        const finalizar = valor => {
            overlay.classList.remove("active");
            document.body.classList.remove("modal-open");
            confirmar.onclick = null;
            cancelar.onclick = null;
            overlay.onclick = null;
            resolve(valor);
        };

        confirmar.onclick = () => finalizar(true);
        cancelar.onclick = () => finalizar(false);
        overlay.onclick = event => {
            if (event.target === overlay) {
                finalizar(false);
            }
        };
    });
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

function buscarAjudante(id) {
    return ajudantes.find(ajudante => ajudante.id === id);
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

        responseAjudantes,

        responseOperacoes

    ] = await Promise.all([

    fetch("/veiculos"),

    fetch("/manutencoes/ativas"),

    fetch("/manutencoes/finalizadas"),

    fetch("/motoristas"),

    fetch("/ajudantes"),

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
        !responseAjudantes.ok
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

        ajudantes =
            await responseAjudantes.json();

        operacoes =
            await responseOperacoes.json();

        atualizarIndicadores();

        atualizarSidebarContadores();

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

        atualizarResumoAjudantes();

        aplicarFiltrosAjudantes();

        atualizarSelectManutencao();

        atualizarSelectsOperacao();

        aplicarFiltrosOperacao();

        await carregarVeiculosSemClassificacao();

    } catch (error) {

        console.error(
            "Erro ao carregar dados:",
            error
        );

    }

}

function atualizarSidebarContadores() {

    const hoje = hojeISO();

    if (sidebarFleetCount) {
        sidebarFleetCount.textContent = veiculos.length;
    }

    if (sidebarDriversCount) {
        sidebarDriversCount.textContent = motoristas.length;
    }

    if (sidebarHelpersCount) {
        sidebarHelpersCount.textContent = ajudantes.length;
    }

    if (sidebarMaintenanceCount) {
        sidebarMaintenanceCount.textContent = manutencoesAtivas.length;
    }

    if (sidebarOperationsCount) {
        sidebarOperationsCount.textContent = operacoes.filter(
            operacao => operacao.data === hoje
        ).length;
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

    const hoje = hojeISO();

    const registrosHoje = operacoes.filter(
        operacao => operacao.data === hoje
    );

    if (operacaoHoje) {
        operacaoHoje.textContent = registrosHoje.length;
    }

    const motoristasAtivos = motoristas.filter(
        motorista => motorista.ativo
    ).length;

    const taxaDisponibilidade = veiculos.length > 0
        ? Math.round((Math.max(disponiveis, 0) / veiculos.length) * 100)
        : 0;

    if (dashboardDriversActive) {
        dashboardDriversActive.textContent = motoristasAtivos;
    }

    if (dashboardOpsTodayStrip) {
        dashboardOpsTodayStrip.textContent = registrosHoje.length;
    }

    if (dashboardAvailabilityRate) {
        dashboardAvailabilityRate.textContent = `${taxaDisponibilidade}%`;
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

    Chart.defaults.color = "#8b8496";

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
    dashboardFleetChartInstance = null;

    if (dashboardFleetChartCanvas) {

        const itensFrota = [
            { texto: "Disponíveis", quantidade: resumoFrota.DISPONIVEL },
            { texto: "Em manutenção", quantidade: resumoFrota.MANUTENCAO },
            { texto: "Inativos", quantidade: resumoFrota.INATIVO }
        ];

        const totalFrota = itensFrota.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        if (totalFrota === 0) {
            dashboardFleetChartCanvas.innerHTML = `
                <div class="fleet-status-empty">
                    <i data-lucide="truck"></i>
                    <strong>Nenhum veículo cadastrado</strong>
                    <span>A distribuição aparecerá aqui conforme a frota for registrada.</span>
                </div>
            `;
        } else {
            dashboardFleetChartCanvas.innerHTML = itensFrota
                .map(item => {
                    const percentual = Math.round(
                        (item.quantidade / totalFrota) * 100
                    );

                    return `
                        <div class="fleet-status-item">
                            <div class="fleet-status-heading">
                                <span class="fleet-status-label">
                                    <span class="fleet-status-dot"></span>
                                    ${item.texto}
                                </span>
                                <span class="fleet-status-value">
                                    ${item.quantidade}
                                    <small>${percentual}%</small>
                                </span>
                            </div>
                            <div class="fleet-status-track">
                                <span class="fleet-status-fill" style="--status-width:${percentual}%"></span>
                            </div>
                        </div>
                    `;
                })
                .join("");
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
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
        status => ({
            status,
            quantidade: operacoesHoje.filter(
                operacao => operacao.status === status
            ).length
        })
    );

    if (dashboardOperationStatusChartCanvas) {

        const totalRegistros = dadosStatus.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        const itensVisiveis = dadosStatus.filter(
            item => item.quantidade > 0
        );

        if (itensVisiveis.length === 0) {

            dashboardOperationStatusChartCanvas.innerHTML = `
                <div class="operation-status-empty">
                    <i data-lucide="chart-no-axes-column"></i>
                    <strong>Nenhuma operação registrada hoje</strong>
                    <span>Os status aparecerão aqui conforme os registros forem adicionados.</span>
                </div>
            `;

        } else {

            dashboardOperationStatusChartCanvas.innerHTML =
                itensVisiveis
                    .map(item => {

                        const percentual = totalRegistros > 0
                            ? Math.round(
                                (item.quantidade / totalRegistros) * 100
                            )
                            : 0;

                        const configuracao =
                            statusOperacao[item.status];

                        return `
                            <div class="operation-status-item">
                                <div class="operation-status-heading">
                                    <span class="operation-status-label">
                                        <span class="operation-status-dot"></span>
                                        ${escaparHTML(configuracao.texto)}
                                    </span>

                                    <span class="operation-status-value">
                                        ${item.quantidade}
                                        <small>${percentual}%</small>
                                    </span>
                                </div>

                                <div class="operation-status-track">
                                    <span
                                        class="operation-status-fill"
                                        style="--status-width:${percentual}%"
                                    ></span>
                                </div>
                            </div>
                        `;
                    })
                    .join("");

        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
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
                                "#6240af",
                                "#8657dd",
                                "#b995f2"
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
                                color: "#eeeaf3"
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
                            borderColor: "#8657dd",
                            backgroundColor: "rgba(134, 87, 221, 0.10)",
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
                                color: "#eeeaf3"
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
                            backgroundColor: "#8657dd",
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
                                color: "#eeeaf3"
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
                                    color: "#eeeaf3"
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
    lista) {

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
                        Em manutenção
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
                        Em manutenção
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

    const buscaNumerica =
        somenteDigitos(busca);

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
                    )

                    ||

                    (
                        buscaNumerica
                        &&
                        motorista.cpf
                        &&
                        somenteDigitos(motorista.cpf)
                            .includes(buscaNumerica)
                    )

                    ||

                    (
                        motorista.cnh
                        &&
                        motorista.cnh
                            .toLowerCase()
                            .includes(busca)
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
                    colspan="6"
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
                    <span class="cpf-value">
                        ${escaparHTML(formatarCpfTabela(motorista.cpf))}
                    </span>
                </td>

                <td>
                    ${escaparHTML(
                        motorista.telefone
                        ||
                        "Não informado"
                    )}
                </td>

                <td>
                    ${(() => {
                        const cnhStatus = situacaoCnh(motorista);
                        return `
                            <div class="cnh-cell">
                                <strong>${escaparHTML(motorista.cnh || "Não informada")}</strong>
                                <small class="${cnhStatus.classe}">
                                    ${escaparHTML(cnhStatus.texto)}
                                </small>
                            </div>
                        `;
                    })()}
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
                    veiculo.id                )

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

    if (operationHelper) {
        operationHelper.innerHTML = '<option value="">Sem ajudante</option>';
        ajudantes
            .filter(item => item.ativo)
            .forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.nome;
                operationHelper.appendChild(option);
            });
    }

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
                    colspan="7"
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

            const ajudante =
                buscarAjudante(
                    operacao.ajudante_id
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
                    ${ajudante ? ajudante.nome : "—"}
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

// VEÍCULOS SEM CLASSIFICAÇÃO

function mostrarMensagemVeiculosSemClassificacao(
    mensagem,    tipo = ""
) {

    if (!unclassifiedVehiclesMessage) {

        return;

    }

    unclassifiedVehiclesMessage.textContent =
        mensagem;

    unclassifiedVehiclesMessage.className =
        [
            "form-message",
            "unclassified-vehicles-message",
            tipo
        ]
            .filter(
                Boolean
            )
            .join(
                " "
            );

}

function renderizarVeiculosSemClassificacao(
    lista
) {

    if (
        !unclassifiedVehiclesTable
        ||
        !unclassifiedVehiclesTotal
    ) {

        return;

    }

    unclassifiedVehiclesTotal.textContent =
        lista.length;

    unclassifiedVehiclesTable.innerHTML =
        "";

    if (
        lista.length
        ===
        0
    ) {

        unclassifiedVehiclesTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Nenhum veículo pendente para este turno.
                </td>

            </tr>

        `;

        mostrarMensagemVeiculosSemClassificacao(

            "Todos os veículos ativos já possuem classificação neste turno.",

            "success"

        );

        return;

    }

    mostrarMensagemVeiculosSemClassificacao(

        (
            `${lista.length} veículo(s) ainda precisam `
            +
            "ser classificados neste turno."
        ),

        "warning"

    );

    lista.forEach(

        veiculo => {

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
                        ||
                        "Não informada"
                    )}

                </td>

                <td>

                    <span
                        class="badge badge-maintenance"
                    >
                        Pendente
                    </span>

                </td>

                <td>

                    <button
                        class="
                            action-button
                            classify-unclassified-vehicle
                        "
                        data-vehicle-id="${veiculo.id}"
                        type="button"
                    >
                        Classificar
                    </button>

                </td>

            `;

            unclassifiedVehiclesTable.appendChild(
                row
            );

        }

    );

}

function mostrarEstadoInicialVeiculosSemClassificacao() {

    veiculosSemClassificacao =
        [];

    if (unclassifiedVehiclesTotal) {

        unclassifiedVehiclesTotal.textContent =
            "0";

    }

    if (unclassifiedVehiclesTable) {

        unclassifiedVehiclesTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Selecione uma data e um turno específico.
                </td>

            </tr>

        `;

    }

    mostrarMensagemVeiculosSemClassificacao(

        "Selecione uma data e Manhã, Tarde ou Noite para consultar."

    );

}

async function carregarVeiculosSemClassificacao() {

    if (
        !unclassifiedVehiclesPanel
        ||
        !unclassifiedVehiclesTable
    ) {

        return;

    }

    const dataOperacao =

        operationFilterDate
        ?.value

        ||

        "";

    const turno =

        operationFilterShift
        ?.value

        ||

        "";

    if (
        !dataOperacao
        ||
        !turno
    ) {

        mostrarEstadoInicialVeiculosSemClassificacao();

        return;

    }

    unclassifiedVehiclesTable.innerHTML = `

        <tr>

            <td
                colspan="5"
                class="loading"
            >
                Consultando veículos sem classificação...
            </td>

        </tr>

    `;

    mostrarMensagemVeiculosSemClassificacao(

        "Consultando a situação da frota..."

    );

    try {

        const parametros =
            new URLSearchParams({

                data_operacao:
                    dataOperacao,

                turno:
                    turno

            });

        const response =
            await fetch(

                (
                    "/operacoes/veiculos-sem-registro?"
                    +
                    parametros.toString()
                )

            );

        const dados =
            await response.json();

        if (!response.ok) {

            throw new Error(

                dados.detail

                ||

                "Não foi possível consultar os veículos pendentes."

            );

        }

        veiculosSemClassificacao =
            Array.isArray(
                dados
            )
            ?
            dados
            :
            [];

        renderizarVeiculosSemClassificacao(
            veiculosSemClassificacao
        );

    } catch (error) {

        veiculosSemClassificacao =
            [];

        if (unclassifiedVehiclesTotal) {

            unclassifiedVehiclesTotal.textContent =
                "0";

        }

        unclassifiedVehiclesTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Não foi possível carregar os veículos pendentes.
                </td>

            </tr>

        `;

        mostrarMensagemVeiculosSemClassificacao(

            error.message,

            "error"

        );

    }

}

function atualizarCamposClassificacao() {

    if (
        !classifyVehicleType
        ||
        !classifyVehicleReturnDateGroup
        ||
        !classifyVehicleReason
    ) {

        return;

    }

    const manutencao =
        classifyVehicleType.value
        ===
        "MANUTENCAO";

    classifyVehicleReturnDateGroup.hidden =
        !manutencao;

    classifyVehicleReason.required =
        manutencao;

    classifyVehicleReason.placeholder =

        manutencao

        ?

        "Informe o motivo da manutenção."

        :

        "Ex: motorista de folga, veículo sem carga...";

    if (
        !manutencao
        &&
        classifyVehicleReturnDate
    ) {

        classifyVehicleReturnDate.value =
            "";

    }

}

function abrirModalClassificarVeiculo(
    veiculo
) {

    if (
        !classifyVehicleModal
        ||
        !classifyVehicleForm
    ) {

        return;

    }

    classifyVehicleForm.reset();

    classifyVehicleId.value =
        String(
            veiculo.id
        );

    classifyVehiclePlate.textContent =
        veiculo.placa;

    classifyVehicleMeta.textContent =
        [

            veiculo.tipo
            ||
            "Tipo não informado",

            veiculo.categoria
            ||
            "Categoria não informada"

        ]
            .filter(
                Boolean
            )
            .join(
                " • "
            );

    if (classifyVehicleMessage) {

        classifyVehicleMessage.textContent =
            "";

        classifyVehicleMessage.className =
            "form-message";

    }

    atualizarCamposClassificacao();

    classifyVehicleModal.classList.add(
        "active"
    );

}

function fecharModalClassificarVeiculo() {

    classifyVehicleModal
        ?.classList
        .remove(
            "active"
        );

    classifyVehicleForm
        ?.reset();

    if (classifyVehicleReturnDateGroup) {

        classifyVehicleReturnDateGroup.hidden =
            true;

    }

    if (classifyVehicleReason) {

        classifyVehicleReason.required =
            false;

    }

    if (classifyVehicleMessage) {

        classifyVehicleMessage.textContent =
            "";

        classifyVehicleMessage.className =
            "form-message";

    }

}

unclassifiedVehiclesTable?.addEventListener(

    "click",

    event => {

        const button =
            event.target.closest(
                ".classify-unclassified-vehicle"
            );

        if (!button) {

            return;

        }

        const vehicleId =
            Number(
                button.dataset.vehicleId
            );

        const veiculo =
            veiculosSemClassificacao.find(

                item =>
                    item.id
                    ===
                    vehicleId

            )
            ||
            buscarVeiculo(
                vehicleId
            );

        if (!veiculo) {

            return;

        }

        abrirModalClassificarVeiculo(
            veiculo
        );

    }

);

classifyVehicleType?.addEventListener(

    "change",

    atualizarCamposClassificacao

);

closeClassifyVehicleModal?.addEventListener(

    "click",

    fecharModalClassificarVeiculo

);

cancelClassifyVehicleModal?.addEventListener(

    "click",

    fecharModalClassificarVeiculo

);

classifyVehicleForm?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();

        const vehicleId =
            Number(
                classifyVehicleId.value
            );

        const classificacao =
            classifyVehicleType.value;

        const dataOperacao =
            operationFilterDate.value;

        const turno =
            operationFilterShift.value;

        if (
            !vehicleId
            ||
            !classificacao
            ||
            !dataOperacao
            ||
            !turno
        ) {

            classifyVehicleMessage.textContent =
                (
                    "Não foi possível identificar o veículo, "
                    +
                    "a data, o turno ou a classificação."
                );

            classifyVehicleMessage.className =
                "form-message error";

            return;

        }

        saveClassifyVehicleButton.disabled =
            true;

        saveClassifyVehicleButton.textContent =
            "Salvando...";

        classifyVehicleMessage.textContent =
            "";

        try {

            const response =
                await fetch(

                    (
                        `/operacoes/veiculos/${vehicleId}/classificar`
                        +
                        "/classificar"
                    ),

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
                                    dataOperacao,

                                turno:
                                    turno,

                                classificacao:
                                    classificacao,

                                motivo:
                                    classifyVehicleReason.value
                                        .trim()
                                    ||
                                    null,

                                previsao_retorno:

                                    classificacao
                                    ===
                                    "MANUTENCAO"

                                    &&

                                    classifyVehicleReturnDate.value

                                    ?

                                    classifyVehicleReturnDate.value

                                    :

                                    null

                            })

                    }

                );

            const dados =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    dados.detail

                    ||

                    "Não foi possível classificar o veículo."

                );

            }

            classifyVehicleMessage.textContent =
                dados.mensagem
                ||
                "Classificação salva com sucesso.";

            classifyVehicleMessage.className =
                "form-message success";

            await carregarDados();

            fecharModalClassificarVeiculo();

        } catch (error) {

            classifyVehicleMessage.textContent =
                error.message;

            classifyVehicleMessage.className =
                "form-message error";

        }

        finally {

            saveClassifyVehicleButton.disabled =
                false;

            saveClassifyVehicleButton.textContent =
                "Salvar classificação";

        }

    }

);

// NAVEGAÇÃO

function mostrarTela(
    telaAtiva,
    menuAtivo
) {

    const telas = [

        dashboardView,

        fleetView,

        driversView,

        helpersView,

        maintenanceView,

        operationsView,

        panoramaView

    ];

    const menus = [

        menuDashboard,

        menuFleet,

        menuDrivers,

        menuHelpers,

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

menuHelpers?.addEventListener(

    "click",

    () =>

        mostrarTela(

            helpersView,

            menuHelpers

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

        carregarVeiculosSemClassificacao();

    }

);

menuPanorama?.addEventListener(

    "click",

    () => {

        mostrarTela(

            panoramaView,

            menuPanorama

        );

        carregarConfiguracaoPanorama();

    }

);

// SAIR

logoutButton?.addEventListener(
    "click",
    async () => {

        try {

            await fetch(
                "/auth/logout",
                {
                    method: "POST"
                }
            );

        } finally {

            window.location.href =
                "/login";

        }

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

    () => {

        aplicarFiltrosOperacao();

        carregarVeiculosSemClassificacao();

    }

);

operationFilterShift?.addEventListener(

    "change",

    () => {

        aplicarFiltrosOperacao();

        carregarVeiculosSemClassificacao();

    }

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
                await confirmarAcao(

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

                mostrarToast(
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
            await excluirVeiculo(
                vehicleId,
                veiculo
            );

            return;
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
    veiculo) {

    if (!editVehicleModal) {
                return;

    }

    editVehicleId.value =
        veiculo.id;

    editVehiclePlate.value =
        veiculo.placa;
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


async function excluirVeiculo(
    vehicleId,
    veiculo
) {
    if (!vehicleId || !veiculo) {
        return;
    }

    const confirmar = await confirmarAcao(
        `Deseja excluir o veículo ${veiculo.placa} da base? Se houver histórico, o Ylume Ops oferecerá a opção de arquivá-lo sem apagar operações e manutenções anteriores.`,
        {
            titulo: "Excluir veículo",
            confirmarTexto: "Excluir",
            perigo: true
        }
    );

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(
            `/veiculos/${vehicleId}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            fecharModalEditarVeiculo();
            await carregarDados();
            mostrarToast("Veículo excluído com sucesso.", "success");
            return;
        }

        const data = await response.json();

        if (response.status === 409) {
            const arquivar = await confirmarAcao(
                "Este veículo possui histórico de operação ou manutenção. Você pode arquivá-lo para removê-lo da frota ativa sem perder os registros anteriores.",
                {
                    eyebrow: "HISTÓRICO PRESERVADO",
                    titulo: "Arquivar veículo?",
                    confirmarTexto: "Arquivar veículo"
                }
            );

            if (!arquivar) {
                return;
            }

            const responseArquivar = await fetch(
                `/veiculos/${vehicleId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ativo: false })
                }
            );

            if (!responseArquivar.ok) {
                const erro = await responseArquivar.json();
                throw new Error(
                    erro.detail || "Não foi possível arquivar o veículo."
                );
            }

            fecharModalEditarVeiculo();
            await carregarDados();
            mostrarToast("Veículo arquivado. O histórico foi preservado.", "success");
            return;
        }

        throw new Error(
            data.detail || "Não foi possível excluir o veículo."
        );
    } catch (error) {
        mostrarToast(error.message);
    }
}


deleteVehicleFromModal?.addEventListener(
    "click",
    async () => {

        const vehicleId =
            Number(editVehicleId.value);

        await excluirVeiculo(
            vehicleId,
            buscarVeiculo(vehicleId)
        );

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
                                    ${
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

    editDriverCpf.value =
        formatarCPF(motorista.cpf);

    editDriverPhone.value =
        motorista.telefone
        ||
        "";

    editDriverCnh.value =
        motorista.cnh
        ||
        "";

    editDriverCnhCategory.value =
        motorista.categoria_cnh
        ||
        "";

    editDriverCnhExpiry.value =
        motorista.validade_cnh
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

                                cpf:
                                    somenteDigitos(editDriverCpf.value)
                                    ||
                                    null,

                                telefone:
                                    editDriverPhone.value
                                        .trim()
                                    ||
                                    null,

                                cnh:
                                    editDriverCnh.value
                                        .trim()
                                    ||
                                    null,

                                categoria_cnh:
                                    editDriverCnhCategory.value
                                        .trim()
                                        .toUpperCase()
                                    ||
                                    null,

                                validade_cnh:
                                    editDriverCnhExpiry.value
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

                                cpf:
                                    somenteDigitos(driverCpf.value)
                                    ||
                                    null,

                                telefone:
                                    driverPhone.value
                                        .trim()
                                    ||
                                    null,

                                cnh:
                                    driverCnh.value
                                        .trim()
                                    ||
                                    null,

                                categoria_cnh:
                                    driverCnhCategory.value
                                        .trim()
                                        .toUpperCase()
                                    ||
                                    null,

                                validade_cnh:
                                    driverCnhExpiry.value
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

driverCpf?.addEventListener("input", () => {
    driverCpf.value = formatarCPF(driverCpf.value);
});

editDriverCpf?.addEventListener("input", () => {
    editDriverCpf.value = formatarCPF(editDriverCpf.value);
});

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
                await confirmarAcao(

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

                mostrarToast(
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
            await excluirMotorista(
                driverId,
                motorista
            );

            return;
        }

    }

);

// AJUDANTES

function atualizarResumoAjudantes() {
    if (!helpersRegistered) return;
    const hoje = hojeISO();
    helpersRegistered.textContent = ajudantes.length;
    helpersActive.textContent = ajudantes.filter(item => item.ativo).length;
    helpersInactive.textContent = ajudantes.filter(item => !item.ativo).length;
    helpersOperationsToday.textContent = operacoes.filter(
        item => item.data === hoje && item.ajudante_id
    ).length;
}

function aplicarFiltrosAjudantes() {
    if (!helpersTable) return;
    const busca = (helperSearchInput?.value || "").trim().toLowerCase();
    const statusFiltro = helperStatusFilter?.value || "";
    const lista = ajudantes.filter(item => {
        const texto = `${item.nome || ""} ${item.cpf || ""}`.toLowerCase();
        const statusOk = !statusFiltro || (
            statusFiltro === "ATIVO" ? item.ativo : !item.ativo
        );
        return (!busca || texto.includes(busca)) && statusOk;
    });
    renderizarAjudantes(lista);
}

function renderizarAjudantes(lista) {
    if (!helpersTable) return;
    helpersTable.innerHTML = "";
    if (!lista.length) {
        helpersTable.innerHTML = '<tr><td colspan="5" class="loading">Nenhum ajudante encontrado.</td></tr>';
        return;
    }
    lista.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${escaparHTML(item.nome)}</strong></td>
            <td>${item.cpf ? formatarCPF(item.cpf) : "Não informado"}</td>
            <td>${escaparHTML(item.telefone || "Não informado")}</td>
            <td><span class="badge ${item.ativo ? "badge-active" : "badge-inactive"}">${item.ativo ? "Ativo" : "Inativo"}</span></td>
            <td><div class="table-actions">
                <button class="action-button edit-helper" data-helper-id="${item.id}" type="button">Editar</button>
                <button class="action-button toggle-helper" data-helper-id="${item.id}" type="button">${item.ativo ? "Inativar" : "Reativar"}</button>
                <button class="action-button action-danger delete-helper" data-helper-id="${item.id}" type="button">Excluir</button>
            </div></td>`;
        helpersTable.appendChild(row);
    });
}

function abrirModalAjudante() {
    helperForm?.reset();
    if (helperFormMessage) helperFormMessage.textContent = "";
    helperModal?.classList.add("active");
    document.body.classList.add("modal-open");
}

function fecharModalAjudante() {
    helperModal?.classList.remove("active");
    document.body.classList.remove("modal-open");
}

function abrirModalEditarAjudante(item) {
    editHelperId.value = item.id;
    editHelperName.value = item.nome || "";
    editHelperCpf.value = item.cpf ? formatarCPF(item.cpf) : "";
    editHelperPhone.value = item.telefone || "";
    editHelperObservation.value = item.observacao || "";
    editHelperStatus.value = String(Boolean(item.ativo));
    editHelperFormMessage.textContent = "";
    editHelperModal.classList.add("active");
    document.body.classList.add("modal-open");
}

function fecharModalEditarAjudante() {
    editHelperModal?.classList.remove("active");
    document.body.classList.remove("modal-open");
}

openHelperModal?.addEventListener("click", abrirModalAjudante);
closeHelperModal?.addEventListener("click", fecharModalAjudante);
cancelHelperModal?.addEventListener("click", fecharModalAjudante);
closeEditHelperModal?.addEventListener("click", fecharModalEditarAjudante);
cancelEditHelperModal?.addEventListener("click", fecharModalEditarAjudante);
helperSearchInput?.addEventListener("input", aplicarFiltrosAjudantes);
helperStatusFilter?.addEventListener("change", aplicarFiltrosAjudantes);
helperCpf?.addEventListener("input", () => {
    helperCpf.value = formatarCPF(helperCpf.value);
});
editHelperCpf?.addEventListener("input", () => {
    editHelperCpf.value = formatarCPF(editHelperCpf.value);
});

helperForm?.addEventListener("submit", async event => {
    event.preventDefault();
    try {
        const response = await fetch("/ajudantes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                nome: helperName.value.trim(),
                cpf: helperCpf.value.trim() || null,
                telefone: helperPhone.value.trim() || null,
                observacao: helperObservation.value.trim() || null,
                ativo: true
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || "Não foi possível cadastrar o ajudante.");
        }
        fecharModalAjudante();
        await carregarDados();
        mostrarToast("Ajudante cadastrado com sucesso.", "success");
    } catch (error) {
        helperFormMessage.textContent = error.message;
        helperFormMessage.className = "form-message error";
    }
});

editHelperForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const id = Number(editHelperId.value);
    try {
        const response = await fetch(`/ajudantes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                nome: editHelperName.value.trim(),
                cpf: editHelperCpf.value.trim() || null,
                telefone: editHelperPhone.value.trim() || null,
                observacao: editHelperObservation.value.trim() || null,
                ativo: editHelperStatus.value === "true"
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || "Não foi possível atualizar o ajudante.");
        }
        fecharModalEditarAjudante();
        await carregarDados();
        mostrarToast("Ajudante atualizado com sucesso.", "success");
    } catch (error) {
        editHelperFormMessage.textContent = error.message;
        editHelperFormMessage.className = "form-message error";
    }
});

async function excluirAjudante(id, item) {
    const confirmar = await confirmarAcao(
        `Deseja excluir ${item.nome}?`,
        {titulo: "Excluir ajudante", confirmarTexto: "Excluir", perigo: true}
    );
    if (!confirmar) return;

    const response = await fetch(`/ajudantes/${id}`, {method: "DELETE"});
    if (response.ok) {
        fecharModalEditarAjudante();
        await carregarDados();
        mostrarToast("Ajudante excluído com sucesso.", "success");
        return;
    }

    const data = await response.json();
    if (response.status === 409) {
        const arquivar = await confirmarAcao(
            `${data.detail} Deseja arquivar agora?`,
            {titulo: "Arquivar ajudante", confirmarTexto: "Arquivar"}
        );
        if (!arquivar) return;
        const patch = await fetch(`/ajudantes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ativo: false})
        });
        if (!patch.ok) throw new Error("Não foi possível arquivar o ajudante.");
        fecharModalEditarAjudante();
        await carregarDados();
        mostrarToast("Ajudante arquivado; o histórico foi preservado.", "success");
        return;
    }
    throw new Error(data.detail || "Não foi possível excluir o ajudante.");
}

deleteHelperFromModal?.addEventListener("click", () => {
    const id = Number(editHelperId.value);
    const item = buscarAjudante(id);
    if (item) excluirAjudante(id, item).catch(error => mostrarToast(error.message));
});

helpersTable?.addEventListener("click", async event => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = Number(button.dataset.helperId);
    const item = buscarAjudante(id);
    if (!item) return;

    if (button.classList.contains("edit-helper")) {
        abrirModalEditarAjudante(item);
        return;
    }
    if (button.classList.contains("delete-helper")) {
        excluirAjudante(id, item).catch(error => mostrarToast(error.message));
        return;
    }
    if (button.classList.contains("toggle-helper")) {
        const response = await fetch(`/ajudantes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ativo: !item.ativo})
        });
        if (!response.ok) {
            mostrarToast("Não foi possível alterar o cadastro.");
            return;
        }
        await carregarDados();
    }
});

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

function definirMensagemImportacao(texto = "", tipo = "") {
    if (!smartImportMessage) return;
    smartImportMessage.textContent = texto;
    smartImportMessage.className = `form-message${tipo ? ` ${tipo}` : ""}`;
}

function resetarImportacaoInteligente() {
    smartImportRecords = [];
    smartImportReviewOnly = false;
    if (smartImportOverwriteManual) smartImportOverwriteManual.checked = false;
    if (smartImportPreview) smartImportPreview.hidden = true;
    if (smartImportPreviewBody) smartImportPreviewBody.innerHTML = "";
    if (smartImportSummary) smartImportSummary.innerHTML = "";
    if (smartImportReviewOnlyButton) {
        smartImportReviewOnlyButton.classList.remove("active");
        smartImportReviewOnlyButton.setAttribute("aria-pressed", "false");
    }
    if (smartImportReviewCount) smartImportReviewCount.textContent = "0";
    if (smartImportReadyCount) smartImportReadyCount.textContent = "0";
    definirMensagemImportacao("");
}

async function carregarStatusIAImportacao() {
    if (!importAiStatus) return;
    try {
        const response = await fetch("/importacoes/inteligente/status");
        if (!response.ok) throw new Error();
        const data = await response.json();
        importAiStatus.classList.toggle("ready", Boolean(data.ia_configurada));
        importAiStatus.innerHTML = data.ia_configurada
            ? `<i data-lucide="sparkles"></i><div><strong>IA disponível</strong><span>Leitura de prints habilitada com ${escaparHTML(data.modelo || "modelo configurado")}. Texto e planilhas usam leitura local sempre que possível.</span></div>`
            : `<i data-lucide="shield-check"></i><div><strong>Leitura local disponível</strong><span>Texto, CSV e Excel funcionam sem IA. Para analisar prints, configure a chave de IA no servidor.</span></div>`;
        if (typeof lucide !== "undefined") lucide.createIcons();
    } catch (_) {
        importAiStatus.innerHTML = `<i data-lucide="info"></i><div><strong>Importação assistida</strong><span>Revise todos os dados antes de confirmar.</span></div>`;
    }
}

function abrirModalImportacaoOperacao() {
    if (smartImportDate) smartImportDate.value = operationFilterDate?.value || hojeISO();
    if (smartImportShift) {
        const turnoAtual = operationFilterShift?.value || "";
        smartImportShift.value = ["Manhã", "Tarde", "Noite"].includes(turnoAtual)
            ? turnoAtual
            : "Não informado";
    }
    resetarImportacaoInteligente();
    importOperationModal?.classList.add("active");
    carregarStatusIAImportacao();
}

function fecharModalImportacaoOperacao() {
    importOperationModal?.classList.remove("active");
}


openImportOperationModal?.addEventListener(
    "click",
    abrirModalImportacaoOperacao
);


closeImportOperationModal?.addEventListener(
    "click",
    fecharModalImportacaoOperacao
);


cancelImportOperationModal?.addEventListener(
    "click",
    fecharModalImportacaoOperacao
);


function atualizarArquivosSelecionados(input, destino) {
    if (!destino) return;
    const arquivos = Array.from(input?.files || []);
    destino.innerHTML = arquivos.length
        ? arquivos.map(arquivo => `<span><i data-lucide="file"></i>${escaparHTML(arquivo.name)}</span>`).join("")
        : "";
    if (typeof lucide !== "undefined") lucide.createIcons();
}

importModeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        smartImportMode = tab.dataset.importMode;
        importModeTabs.forEach(item => item.classList.toggle("active", item === tab));
        importModePanels.forEach(panel => panel.classList.toggle("active", panel.dataset.importPanel === smartImportMode));
        resetarImportacaoInteligente();
    });
});

smartImportImages?.addEventListener("change", () => atualizarArquivosSelecionados(smartImportImages, smartImportImageList));
smartImportFiles?.addEventListener("change", () => atualizarArquivosSelecionados(smartImportFiles, smartImportFileList));

const IMPORT_STATUS_OPTIONS = [
    ["CARREGANDO", "Carregando"],
    ["EM_ROTA", "Em rota"],
    ["CONCLUIDA", "Concluída"],
    ["RETORNANDO_ESTACAO", "Retornando à estação"],
    ["AMBULANCIA", "Ambulância entre paradas"],
    ["RESERVA_CARREGANDO", "Reserva / carregando"],
    ["INDISPONIVEL_MOTORISTA", "Indisponível / motorista"],
    ["FOLGA", "Folga planejada"],
    ["MANUTENCAO", "Manutenção"],
    ["IMPEDIDO", "Impedido"],
    ["SEM_CARGA", "Sem carga"],
    ["OUTRO_SERVICE", "Outro service"],
    ["SEM_CLASSIFICACAO", "Sem classificação"]
];

function opcoesStatusImportacao(valor) {
    return IMPORT_STATUS_OPTIONS.map(([id, nome]) => `<option value="${id}" ${id === valor ? "selected" : ""}>${nome}</option>`).join("");
}


function itemImportacaoPrecisaRevisao(item) {
    return Boolean(item?.alerta) || (item?.confianca != null && item.confianca < .8);
}

function aplicarFiltroRevisaoImportacao() {
    if (!smartImportPreviewBody) return;
    smartImportPreviewBody.querySelectorAll("tr[data-import-row]").forEach(row => {
        const precisaRevisao = row.dataset.needsReview === "true";
        row.classList.toggle("review-hidden", smartImportReviewOnly && !precisaRevisao);
    });
    if (smartImportReviewOnlyButton) {
        smartImportReviewOnlyButton.classList.toggle("active", smartImportReviewOnly);
        smartImportReviewOnlyButton.setAttribute("aria-pressed", String(smartImportReviewOnly));
        const label = smartImportReviewOnlyButton.querySelector("[data-review-filter-label]");
        if (label) label.textContent = smartImportReviewOnly ? "Mostrar todos" : "Somente itens para revisar";
    }
}

function validarLinhaImportacao(row, mostrarMensagem = false) {
    if (!row) return true;
    const status = row.querySelector('[data-field="status"]')?.value || "";
    const observacaoInput = row.querySelector('[data-field="observacao"]');
    const motivo = observacaoInput?.value?.trim() || "";
    const motivoObrigatorio = status === "IMPEDIDO" && !motivo;
    row.classList.toggle("missing-required", motivoObrigatorio);
    if (observacaoInput) observacaoInput.classList.toggle("field-invalid", motivoObrigatorio);
    const aviso = row.querySelector("[data-required-note]");
    if (aviso) aviso.hidden = !motivoObrigatorio;
    if (motivoObrigatorio && mostrarMensagem) {
        row.classList.remove("review-hidden");
        row.scrollIntoView({behavior: "smooth", block: "center"});
        observacaoInput?.focus();
    }
    return !motivoObrigatorio;
}

function validarPreviewImportacao() {
    const linhas = Array.from(smartImportPreviewBody?.querySelectorAll("tr[data-import-row]") || []);
    const invalidas = linhas.filter(row => !validarLinhaImportacao(row));
    if (!invalidas.length) return true;
    smartImportReviewOnly = false;
    aplicarFiltroRevisaoImportacao();
    validarLinhaImportacao(invalidas[0], true);
    definirMensagemImportacao(
        `${invalidas.length} registro(s) com status Impedido precisam de um motivo antes da confirmação.`,
        "error"
    );
    return false;
}

function renderizarPreviewImportacao(resultado) {
    smartImportRecords = (resultado.registros || []).map(item => ({...item}));
    if (resultado.data && smartImportDate) smartImportDate.value = resultado.data;
    if (resultado.turno && smartImportShift && ["Não informado", "Geral", "Manhã", "Tarde", "Noite"].includes(resultado.turno)) {
        smartImportShift.value = resultado.turno === "Geral" ? "Não informado" : resultado.turno;
    }
    if (!smartImportRecords.length) {
        definirMensagemImportacao("Nenhum registro foi identificado.", "error");
        return;
    }
    smartImportPreview.hidden = false;
    smartImportPreviewCount.textContent = String(smartImportRecords.length);
    const baixa = smartImportRecords.filter(item => item.confianca != null && item.confianca < .8).length;
    const conflitos = smartImportRecords.filter(item => Boolean(item.alerta)).length;
    const revisar = smartImportRecords.filter(itemImportacaoPrecisaRevisao).length;
    const manut = smartImportRecords.filter(item => item.status === "MANUTENCAO").length;
    const prontos = Math.max(0, smartImportRecords.length - revisar);
    if (smartImportReviewCount) smartImportReviewCount.textContent = String(revisar);
    if (smartImportReadyCount) smartImportReadyCount.textContent = String(prontos);
    smartImportSummary.innerHTML = `<span>${resultado.metodo === "ia" || resultado.metodo === "ia_imagem" ? "IA" : resultado.metodo === "misto" ? "Leitura mista" : "Leitura local"}</span><span>${manut} manutenção(ões)</span>${conflitos ? `<span class="danger">${conflitos} conflito(s)</span>` : ""}${baixa ? `<span class="warning">${baixa} baixa confiança</span>` : ""}`;
    smartImportPreviewBody.innerHTML = smartImportRecords.map((item, index) => {
        const confianca = item.confianca == null ? "—" : `${Math.round(item.confianca * 100)}%`;
        const needsReview = Boolean(item.alerta) || (item.confianca != null && item.confianca < .8);
        const low = needsReview ? " needs-review" : "";
        const revisao = item.alerta
            ? `<small class="import-review-note" title="${escaparHTML(item.alerta)}"><i data-lucide="triangle-alert"></i> Revisar</small>`
            : item.confianca != null && item.confianca < .8
                ? `<small class="import-review-note"><i data-lucide="circle-help"></i> Conferir</small>`
                : "";
        return `<tr data-import-row="${index}" data-needs-review="${needsReview}" class="${low}" ${item.alerta ? `title="${escaparHTML(item.alerta)}"` : ""}>
            <td><input data-field="placa" value="${escaparHTML(item.placa || "")}" /></td>
            <td><input data-field="tipo_veiculo" value="${escaparHTML(item.tipo_veiculo || "")}" placeholder="Tipo" /></td>
            <td><input data-field="motorista" value="${escaparHTML(item.motorista || "")}" placeholder="Motorista" /></td>
            <td><input data-field="ajudante" value="${escaparHTML(item.ajudante || "")}" placeholder="Ajudante" /></td>
            <td><input data-field="rota_id" value="${escaparHTML(item.rota_id || "")}" placeholder="Rota" /></td>
            <td><select data-field="status">${opcoesStatusImportacao(item.status || "SEM_CLASSIFICACAO")}</select></td>
            <td><div class="import-observation-field"><input data-field="observacao" value="${escaparHTML(item.motivo || item.observacao || "")}" placeholder="Motivo ou observação" /><small data-required-note hidden>Motivo obrigatório para veículo impedido.</small></div></td>
            <td class="import-confidence-cell"><span class="confidence-pill${needsReview ? " low-confidence" : ""}">${confianca}</span>${revisao}</td>
            <td><button class="icon-button danger-light" data-remove-import="${index}" title="Remover linha" type="button"><i data-lucide="trash-2"></i></button></td>
        </tr>`;
    }).join("");
    smartImportPreviewBody.querySelectorAll("[data-remove-import]").forEach(button => {
        button.addEventListener("click", () => {
            smartImportRecords.splice(Number(button.dataset.removeImport), 1);
            renderizarPreviewImportacao({...resultado, registros: smartImportRecords});
        });
    });
    smartImportPreviewBody.querySelectorAll("tr[data-import-row]").forEach(row => {
        const status = row.querySelector('[data-field="status"]');
        const observacao = row.querySelector('[data-field="observacao"]');
        status?.addEventListener("change", () => validarLinhaImportacao(row));
        observacao?.addEventListener("input", () => validarLinhaImportacao(row));
        validarLinhaImportacao(row);
    });
    aplicarFiltroRevisaoImportacao();
    if (resultado.avisos?.length) definirMensagemImportacao(resultado.avisos.join(" "), "warning");
    else definirMensagemImportacao("Dados identificados. Revise a prévia antes de confirmar.", "success");
    if (typeof lucide !== "undefined") lucide.createIcons();
}

function coletarPreviewEditado() {
    const registros = [];
    smartImportPreviewBody?.querySelectorAll("tr[data-import-row]").forEach(row => {
        const index = Number(row.dataset.importRow);
        const original = smartImportRecords[index] || {};
        const get = campo => row.querySelector(`[data-field="${campo}"]`)?.value?.trim() || null;
        const status = get("status") || "SEM_CLASSIFICACAO";
        registros.push({
            ...original,
            placa: (get("placa") || "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
            tipo_veiculo: get("tipo_veiculo"),
            motorista: get("motorista"),
            ajudante: get("ajudante"),
            rota_id: get("rota_id"),
            status,
            tipo_registro: status === "MANUTENCAO" ? "MANUTENCAO" : "OPERACAO",
            motivo: status === "MANUTENCAO" || status === "IMPEDIDO" ? get("observacao") : null,
            observacao: status === "MANUTENCAO" || status === "IMPEDIDO" ? null : get("observacao")
        });
    });
    return registros.filter(item => item.placa);
}

async function analisarImportacaoInteligente() {
    definirMensagemImportacao("Analisando dados...", "loading");
    smartImportAnalyzeButton.disabled = true;
    try {
        let response;
        if (smartImportMode === "text") {
            const texto = smartImportText?.value?.trim();
            if (!texto) throw new Error("Cole o panorama ou as informações que deseja importar.");
            response = await fetch("/importacoes/inteligente/analisar-texto", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    texto,
                    data: smartImportDate?.value || null,
                    turno: smartImportShift?.value || null,
                    usar_ia: Boolean(smartImportUseAi?.checked)
                })
            });
        } else {
            const input = smartImportMode === "image" ? smartImportImages : smartImportFiles;
            const arquivos = Array.from(input?.files || []);
            if (!arquivos.length) throw new Error(smartImportMode === "image" ? "Selecione ao menos um print." : "Selecione um arquivo Excel ou CSV.");
            const form = new FormData();
            arquivos.forEach(arquivo => form.append("arquivos", arquivo));
            form.append("data_operacao", smartImportDate?.value || "");
            form.append("turno", smartImportShift?.value || "");
            response = await fetch("/importacoes/inteligente/analisar-arquivos", {method: "POST", body: form});
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Não foi possível analisar os dados.");
        renderizarPreviewImportacao(data);
    } catch (error) {
        definirMensagemImportacao(error.message || "Não foi possível analisar os dados.", "error");
    } finally {
        smartImportAnalyzeButton.disabled = false;
    }
}

async function confirmarImportacaoInteligente() {
    if (!validarPreviewImportacao()) return;
    const registros = coletarPreviewEditado();
    if (!registros.length) {
        definirMensagemImportacao("Não há registros válidos para importar.", "error");
        return;
    }
    const data = smartImportDate?.value;
    const turno = smartImportShift?.value;
    if (!data || !turno) {
        definirMensagemImportacao("Informe a data e selecione um turno ou “Geral / não informado” antes de confirmar.", "error");
        return;
    }
    const confirmar = await confirmarAcao(
        `Confirmar a importação de ${registros.length} registro(s)? Cadastros novos de veículos, motoristas e ajudantes poderão ser criados automaticamente.`,
        {eyebrow: "IMPORTAÇÃO INTELIGENTE", titulo: "Confirmar registros", confirmarTexto: "Importar dados"}
    );
    if (!confirmar) return;
    smartImportConfirmButton.disabled = true;
    definirMensagemImportacao("Gravando registros...", "loading");
    try {
        const response = await fetch("/importacoes/inteligente/confirmar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                data,
                turno,
                origem: smartImportMode === "image" ? "IMPORTACAO_IA" : smartImportMode === "file" ? "IMPORTACAO_ARQUIVO" : "IMPORTACAO_TEXTO",
                sobrescrever_manuais: Boolean(smartImportOverwriteManual?.checked),
                registros
            })
        });
        const resultado = await response.json();
        if (!response.ok) throw new Error(resultado.detail || "Falha ao importar os registros.");
        await carregarDados();
        const totalAlterado = resultado.operacoes_importadas + resultado.operacoes_atualizadas + resultado.manutencoes_importadas + resultado.manutencoes_atualizadas;
        fecharModalImportacaoOperacao();
        mostrarToast(`${totalAlterado} registro(s) processado(s). ${resultado.ignorados ? `${resultado.ignorados} requer(em) revisão.` : "Importação concluída."}`, resultado.ignorados ? "warning" : "success");
    } catch (error) {
        definirMensagemImportacao(error.message || "Não foi possível concluir a importação.", "error");
    } finally {
        smartImportConfirmButton.disabled = false;
    }
}

smartImportAnalyzeButton?.addEventListener("click", analisarImportacaoInteligente);
smartImportReviewOnlyButton?.addEventListener("click", () => {
    smartImportReviewOnly = !smartImportReviewOnly;
    aplicarFiltroRevisaoImportacao();
});
smartImportConfirmButton?.addEventListener("click", confirmarImportacaoInteligente);
smartImportBackButton?.addEventListener("click", () => {
    if (smartImportPreview) smartImportPreview.hidden = true;
    definirMensagemImportacao("Ajuste a fonte e analise novamente quando estiver pronta.");
});


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

                                ajudante_id:
                                    operationHelper && operationHelper.value
                                    ? Number(operationHelper.value)
                                    : null,

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
            await confirmarAcao(

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

            mostrarToast(
                "Não foi possível excluir o registro."
            );

            return;

        }

        await carregarDados();

    }

);

// PANORAMA

async function carregarConfiguracaoPanorama() {
    try {
        const response = await fetch("/configuracao-panorama");
        if (!response.ok) return;
        const config = await response.json();
        if (panoramaUnit) panoramaUnit.value = config.unidade || "";
        if (panoramaOperator) panoramaOperator.value = config.operador || "";
    } catch (error) {
        console.error("Erro ao carregar configuração do panorama:", error);
    }
}

savePanoramaConfigButton?.addEventListener("click", async () => {
    try {
        const response = await fetch("/configuracao-panorama", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                unidade: panoramaUnit?.value || "",
                operador: panoramaOperator?.value || ""
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || "Não foi possível salvar o cabeçalho.");
        }
        mostrarToast("Cabeçalho do panorama salvo.", "success");
    } catch (error) {
        mostrarToast(error.message);
    }
});

document.querySelectorAll(".emoji-insert-button").forEach(button => {
    button.addEventListener("click", () => {
        if (!panoramaText) return;
        const emoji = button.dataset.emoji || "";
        const inicio = panoramaText.selectionStart ?? panoramaText.value.length;
        const fim = panoramaText.selectionEnd ?? inicio;
        panoramaText.value =
            panoramaText.value.slice(0, inicio) +
            emoji +
            panoramaText.value.slice(fim);
        panoramaText.focus();
        panoramaText.selectionStart = panoramaText.selectionEnd = inicio + emoji.length;
    });
});

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

        panoramaText.value =
            resultado.texto;

        panoramaTotalVehicles.textContent =
            resultado.total_veiculos;

        panoramaMaintenance.textContent =
            resultado.veiculos_manutencao;

        panoramaOperations.textContent =
            resultado.veiculos_operacao;

        if (panoramaIdle) {
            panoramaIdle.textContent = resultado.veiculos_ociosos;
        }

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
        panoramaText.value;

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
            "Copiado";

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
        importOperationModal,
        fecharModalImportacaoOperacao
    ],

    [
        operationModal,
        fecharModalOperacao
    ],

    [
        classifyVehicleModal,
        fecharModalClassificarVeiculo
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

        fecharModalAjudante();

        fecharModalEditarAjudante();

        fecharHistoricoMotorista();

        fecharModalManutencao();

        fecharModalFinalizarManutencao();

        fecharDetalhesManutencao();

        fecharModalOperacao();

        fecharModalClassificarVeiculo();

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

// IMPORTAÇÃO INTELIGENTE
// A entrada de dados será feita por upload/colagem,
// com conferência antes da persistência.


// CARGA INICIAL DO SISTEMA

carregarConfiguracaoPanorama();
carregarDados();
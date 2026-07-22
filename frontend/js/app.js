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


// ELEMENTOS - NAVEGAÇÃO

const menuDashboard =
    document.getElementById("menuDashboard");

const menuDrivers =
    document.getElementById("menuDrivers");

const menuMaintenance =
    document.getElementById("menuMaintenance");

const menuOperations =
    document.getElementById("menuOperations");


const dashboardView =
    document.getElementById("dashboardView");

const driversView =
    document.getElementById("driversView");

const maintenanceView =
    document.getElementById("maintenanceView");

const operationsView =
    document.getElementById("operationsView");


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


// ELEMENTOS - MOTORISTAS

const driversTable =
    document.getElementById("driversTable");

const driversTotal =
    document.getElementById("driversTotal");

const driverSearchInput =
    document.getElementById("driverSearchInput");

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

const driverFormMessage =
    document.getElementById("driverFormMessage");

const saveDriverButton =
    document.getElementById("saveDriverButton");


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


// DADOS

let veiculos = [];

let manutencoesAtivas = [];

let motoristas = [];

let operacoes = [];


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

            responseMotoristas,

            responseOperacoes

        ] = await Promise.all([

            fetch("/veiculos"),

            fetch("/manutencoes/ativas"),

            fetch("/motoristas"),

            fetch("/operacoes")

        ]);


        if (
            !responseVeiculos.ok
            ||
            !responseManutencoes.ok
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


        motoristas =
            await responseMotoristas.json();


        operacoes =
            await responseOperacoes.json();


        atualizarIndicadores();

        renderizarVeiculos(
            veiculos
        );

        renderizarManutencoes();

        renderizarMotoristas(
            motoristas
        );

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


// MANUTENÇÕES

function renderizarManutencoes() {

    if (!maintenanceTable) {

        return;

    }


    maintenanceTable.innerHTML =
        "";


    if (
        manutencoesAtivas.length
        ===
        0
    ) {

        maintenanceTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Nenhum veículo em manutenção.
                </td>

            </tr>

        `;


        return;

    }


    manutencoesAtivas.forEach(

        manutencao => {

            const veiculo =
                buscarVeiculo(
                    manutencao.veiculo_id
                );


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
                        "Não encontrado"
                    }

                </td>


                <td>

                    ${
                        manutencao.motivo
                    }

                </td>


                <td>

                    ${
                        formatarData(
                            manutencao.data_entrada
                        )
                    }

                </td>


                <td>

                    ${
                        formatarData(
                            manutencao.previsao_retorno
                        )
                    }

                </td>


                <td>

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

                </td>

            `;


            maintenanceTable.appendChild(
                row
            );

        }

    );

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


    const disponiveis =
        veiculos.filter(

            veiculo =>

                veiculo.ativo
                &&
                !buscarManutencaoAtiva(
                    veiculo.id
                )

        );


    disponiveis.forEach(

        veiculo => {

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

        }

    );

}


// MOTORISTAS

function renderizarMotoristas(
    lista
) {

    if (!driversTable) {

        return;

    }


    driversTable.innerHTML =
        "";


    if (
        lista.length === 0
    ) {

        driversTable.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="loading"
                >
                    Nenhum motorista cadastrado.
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


            row.innerHTML = `

                <td>

                    <strong>

                        ${motorista.nome}

                    </strong>

                </td>


                <td>

                    ${
                        motorista.telefone
                        ||
                        "Não informado"
                    }

                </td>


                <td>

                    <span
                        class="
                            badge
                            ${
                                motorista.ativo
                                ?
                                "badge-active"
                                :
                                "badge-inactive"
                            }
                        "
                    >

                        ${
                            motorista.ativo
                            ?
                            "Ativo"
                            :
                            "Inativo"
                        }

                    </span>

                </td>


                <td>

                    <button

                        class="
                            action-button
                            toggle-driver
                        "

                        data-driver-id="${motorista.id}"

                        data-driver-active="${motorista.ativo}"

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

        <option value="">
            Selecione um motorista
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

        driversView,

        maintenanceView,

        operationsView

    ];


    const menus = [

        menuDashboard,

        menuDrivers,

        menuMaintenance,

        menuOperations

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


driverSearchInput?.addEventListener(

    "input",

    event => {

        const busca =
            event.target.value
                .trim()
                .toLowerCase();


        renderizarMotoristas(

            motoristas.filter(

                motorista =>

                    motorista.nome
                        .toLowerCase()
                        .includes(
                            busca
                        )

            )

        );

    }

);


operationFilterDate?.addEventListener(

    "change",

    aplicarFiltrosOperacao

);


operationFilterShift?.addEventListener(

    "change",

    aplicarFiltrosOperacao

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


// ATIVAR / INATIVAR MOTORISTA

driversTable?.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                ".toggle-driver"
            );


        if (!button) {

            return;

        }


        const id =
            button.dataset.driverId;


        const ativo =

            button.dataset.driverActive

            ===

            "true";


        await fetch(

            `/motoristas/${id}`,

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
                            !ativo

                    })

            }

        );


        await carregarDados();

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


// FINALIZAR MANUTENÇÃO

maintenanceTable?.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                ".finish-maintenance"
            );


        if (!button) {

            return;

        }


        if (
            !window.confirm(
                "Confirmar retorno deste veículo?"
            )
        ) {

            return;

        }


        await fetch(

            `/manutencoes/${button.dataset.maintenanceId}/finalizar`,

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
                            hojeISO()

                    })

            }

        );


        await carregarDados();

    }

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


// FECHAR MODAIS CLICANDO FORA

const modais = [

    [
        vehicleModal,
        fecharModalVeiculo
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

        fecharModalMotorista();

        fecharModalManutencao();

        fecharModalOperacao();

    }

);


// INICIALIZAÇÃO

if (operationFilterDate) {

    operationFilterDate.value =
        hojeISO();

}


carregarDados();
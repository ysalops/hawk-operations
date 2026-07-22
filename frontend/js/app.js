// =====================================================
// HAWK OPERATIONS
// app.js


// ELEMENTOS - DASHBOARD / FROTA

const tableBody =
    document.getElementById("veiculosTable");

const totalVeiculos =
    document.getElementById("totalVeiculos");

const veiculosAtivos =
    document.getElementById("veiculosAtivos");

const veiculosManutencao =
    document.getElementById("veiculosManutencao");

const searchInput =
    document.getElementById("searchInput");


// ELEMENTOS - NAVEGAÇÃO

const menuDashboard =
    document.getElementById("menuDashboard");

const menuDrivers =
    document.getElementById("menuDrivers");

const menuMaintenance =
    document.getElementById("menuMaintenance");


const dashboardView =
    document.getElementById("dashboardView");

const driversView =
    document.getElementById("driversView");

const maintenanceView =
    document.getElementById("maintenanceView");


// ELEMENTOS - MODAL VEÍCULO

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


// DADOS

let veiculos = [];

let manutencoesAtivas = [];

let motoristas = [];


// UTILITÁRIOS

function hojeISO() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");


    return `${ano}-${mes}-${dia}`;

}


function formatarData(data) {

    if (!data) {

        return "—";

    }


    const [
        ano,
        mes,
        dia
    ] = data.split("-");


    return `${dia}/${mes}/${ano}`;

}


// CARREGAR TODOS OS DADOS

async function carregarDados() {

    try {

        const [
            responseVeiculos,
            responseManutencoes,
            responseMotoristas
        ] = await Promise.all([

            fetch("/veiculos"),

            fetch("/manutencoes/ativas"),

            fetch("/motoristas")

        ]);


        if (!responseVeiculos.ok) {

            throw new Error(
                "Erro ao carregar veículos."
            );

        }


        if (!responseManutencoes.ok) {

            throw new Error(
                "Erro ao carregar manutenções."
            );

        }


        if (!responseMotoristas.ok) {

            throw new Error(
                "Erro ao carregar motoristas."
            );

        }


        veiculos =
            await responseVeiculos.json();


        manutencoesAtivas =
            await responseManutencoes.json();


        motoristas =
            await responseMotoristas.json();


        atualizarIndicadores();


        renderizarVeiculos(
            veiculos
        );


        renderizarManutencoes();


        renderizarMotoristas(
            motoristas
        );


        atualizarSelectManutencao();


    } catch (error) {

        console.error(
            "Erro ao carregar dados:",
            error
        );


        if (tableBody) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="loading"
                    >
                        Erro ao carregar a frota.
                    </td>

                </tr>

            `;

        }

    }

}


// INDICADORES

function atualizarIndicadores() {

    const veiculosAtivosNaBase =
        veiculos.filter(

            veiculo =>
                veiculo.ativo

        );


    const quantidadeManutencoes =
        manutencoesAtivas.length;


    const quantidadeDisponiveis =
        Math.max(

            veiculosAtivosNaBase.length
            -
            quantidadeManutencoes,

            0

        );


    if (totalVeiculos) {

        totalVeiculos.textContent =
            veiculos.length;

    }


    if (veiculosAtivos) {

        veiculosAtivos.textContent =
            quantidadeDisponiveis;

    }


    if (veiculosManutencao) {

        veiculosManutencao.textContent =
            quantidadeManutencoes;

    }


    if (maintenanceTotal) {

        maintenanceTotal.textContent =
            quantidadeManutencoes;

    }


    if (driversTotal) {

        const motoristasAtivos =
            motoristas.filter(

                motorista =>
                    motorista.ativo

            );


        driversTotal.textContent =
            motoristasAtivos.length;

    }

}


// BUSCAR MANUTENÇÃO ATIVA DE UM VEÍCULO

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


// RENDERIZAR FROTA

function renderizarVeiculos(lista) {

    if (!tableBody) {

        return;

    }


    tableBody.innerHTML =
        "";


    if (lista.length === 0) {

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

            else if (veiculo.ativo) {

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


// RENDERIZAR MANUTENÇÕES

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
                veiculos.find(

                    item =>

                        item.id
                        ===
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


// ATUALIZAR SELECT DE MANUTENÇÃO

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

            veiculo => {

                const manutencao =
                    buscarManutencaoAtiva(
                        veiculo.id
                    );


                return (

                    veiculo.ativo
                    &&
                    !manutencao

                );

            }

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


// RENDERIZAR MOTORISTAS

function renderizarMotoristas(lista) {

    if (!driversTable) {

        return;

    }


    driversTable.innerHTML =
        "";


    const motoristasAtivos =
        motoristas.filter(

            motorista =>
                motorista.ativo

        );


    if (driversTotal) {

        driversTotal.textContent =
            motoristasAtivos.length;

    }


    if (lista.length === 0) {

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
                        ${
                            motorista.nome
                        }
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


// NAVEGAÇÃO

function mostrarTela(
    telaAtiva,
    menuAtivo
) {

    const telas = [

        dashboardView,

        driversView,

        maintenanceView

    ];


    const menus = [

        menuDashboard,

        menuDrivers,

        menuMaintenance

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


if (menuDashboard) {

    menuDashboard.addEventListener(

        "click",

        () => {

            mostrarTela(

                dashboardView,

                menuDashboard

            );

        }

    );

}


if (menuDrivers) {

    menuDrivers.addEventListener(

        "click",

        () => {

            mostrarTela(

                driversView,

                menuDrivers

            );

        }

    );

}


if (menuMaintenance) {

    menuMaintenance.addEventListener(

        "click",

        () => {

            mostrarTela(

                maintenanceView,

                menuMaintenance

            );

        }

    );

}


// BUSCA - FROTA

if (searchInput) {

    searchInput.addEventListener(

        "input",

        event => {

            const busca =
                event.target.value
                    .trim()
                    .toUpperCase();


            const resultado =
                veiculos.filter(

                    veiculo =>

                        veiculo.placa
                            .toUpperCase()
                            .includes(
                                busca
                            )

                );


            renderizarVeiculos(
                resultado
            );

        }

    );

}


// BUSCA - MOTORISTAS

if (driverSearchInput) {

    driverSearchInput.addEventListener(

        "input",

        event => {

            const busca =
                event.target.value
                    .trim()
                    .toLowerCase();


            const resultado =
                motoristas.filter(

                    motorista =>

                        motorista.nome
                            .toLowerCase()
                            .includes(
                                busca
                            )

                );


            renderizarMotoristas(
                resultado
            );

        }

    );

}


// MODAL VEÍCULO

function abrirModalVeiculo() {

    vehicleModal
        .classList
        .add(
            "active"
        );


    vehicleFormMessage.textContent =
        "";


    setTimeout(

        () => {

            vehiclePlate.focus();

        },

        100

    );

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


openVehicleModal.addEventListener(
    "click",
    abrirModalVeiculo
);


closeVehicleModal.addEventListener(
    "click",
    fecharModalVeiculo
);


cancelVehicleModal.addEventListener(
    "click",
    fecharModalVeiculo
);


// CADASTRAR VEÍCULO

vehicleForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        saveVehicleButton.disabled =
            true;


        saveVehicleButton.textContent =
            "Cadastrando...";


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
                    ||
                    "Erro ao cadastrar veículo."

                );

            }


            await carregarDados();


            fecharModalVeiculo();


        } catch (error) {

            vehicleFormMessage.textContent =
                error.message;


            vehicleFormMessage.className =
                "form-message error";


        } finally {

            saveVehicleButton.disabled =
                false;


            saveVehicleButton.textContent =
                "Cadastrar veículo";

        }

    }

);


// MODAL MANUTENÇÃO

function abrirModalManutencao() {

    maintenanceEntryDate.value =
        hojeISO();


    maintenanceModal
        .classList
        .add(
            "active"
        );


    maintenanceFormMessage.textContent =
        "";

}


function fecharModalManutencao() {

    maintenanceModal
        .classList
        .remove(
            "active"
        );


    maintenanceForm.reset();


    maintenanceFormMessage.textContent =
        "";

}


openMaintenanceModal.addEventListener(
    "click",
    abrirModalManutencao
);


closeMaintenanceModal.addEventListener(
    "click",
    fecharModalManutencao
);


cancelMaintenanceModal.addEventListener(
    "click",
    fecharModalManutencao
);


// CADASTRAR MANUTENÇÃO

maintenanceForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        saveMaintenanceButton.disabled =
            true;


        saveMaintenanceButton.textContent =
            "Registrando...";


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
                    ||
                    "Erro ao registrar manutenção."

                );

            }


            await carregarDados();


            fecharModalManutencao();


        } catch (error) {

            maintenanceFormMessage.textContent =
                error.message;


            maintenanceFormMessage.className =
                "form-message error";


        } finally {

            saveMaintenanceButton.disabled =
                false;


            saveMaintenanceButton.textContent =
                "Registrar manutenção";

        }

    }

);


// FINALIZAR MANUTENÇÃO

maintenanceTable.addEventListener(

    "click",

    async event => {

        const button =
            event.target.closest(
                ".finish-maintenance"
            );


        if (!button) {

            return;

        }


        const id =
            button.dataset
                .maintenanceId;


        const confirmar =
            window.confirm(

                "Confirmar o retorno deste veículo?"

            );


        if (!confirmar) {

            return;

        }


        try {

            const response =
                await fetch(

                    `/manutencoes/${id}/finalizar`,

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


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(

                    data.detail
                    ||
                    "Erro ao finalizar manutenção."

                );

            }


            await carregarDados();


        } catch (error) {

            alert(
                error.message
            );

        }

    }

);


// MODAL MOTORISTA

function abrirModalMotorista() {

    driverModal
        .classList
        .add(
            "active"
        );


    driverFormMessage.textContent =
        "";


    setTimeout(

        () => {

            driverName.focus();

        },

        100

    );

}


function fecharModalMotorista() {

    driverModal
        .classList
        .remove(
            "active"
        );


    driverForm.reset();


    driverFormMessage.textContent =
        "";

}


openDriverModal.addEventListener(
    "click",
    abrirModalMotorista
);


closeDriverModal.addEventListener(
    "click",
    fecharModalMotorista
);


cancelDriverModal.addEventListener(
    "click",
    fecharModalMotorista
);


// CADASTRAR MOTORISTA

driverForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        saveDriverButton.disabled =
            true;


        saveDriverButton.textContent =
            "Cadastrando...";


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
                    ||
                    "Erro ao cadastrar motorista."

                );

            }


            await carregarDados();


            fecharModalMotorista();


        } catch (error) {

            driverFormMessage.textContent =
                error.message;


            driverFormMessage.className =
                "form-message error";


        } finally {

            saveDriverButton.disabled =
                false;


            saveDriverButton.textContent =
                "Cadastrar motorista";

        }

    }

);


// ATIVAR / INATIVAR MOTORISTA

driversTable.addEventListener(

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
            button.dataset
                .driverId;


        const ativo =
            button.dataset
                .driverActive
            ===
            "true";


        try {

            const response =
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


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(

                    data.detail
                    ||
                    "Erro ao atualizar motorista."

                );

            }


            await carregarDados();


        } catch (error) {

            alert(
                error.message
            );

        }

    }

);


// FECHAR MODAIS CLICANDO FORA

vehicleModal.addEventListener(

    "click",

    event => {

        if (
            event.target
            ===
            vehicleModal
        ) {

            fecharModalVeiculo();

        }

    }

);


maintenanceModal.addEventListener(

    "click",

    event => {

        if (
            event.target
            ===
            maintenanceModal
        ) {

            fecharModalManutencao();

        }

    }

);


driverModal.addEventListener(

    "click",

    event => {

        if (
            event.target
            ===
            driverModal
        ) {

            fecharModalMotorista();

        }

    }

);


// ESC FECHA TODOS OS MODAIS

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

        fecharModalManutencao();

        fecharModalMotorista();

    }

);


// INICIALIZAÇÃO

carregarDados();
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

// MENU / TELAS

const menuDashboard =
    document.getElementById("menuDashboard");

const menuMaintenance =
    document.getElementById("menuMaintenance");

const dashboardView =
    document.getElementById("dashboardView");

const maintenanceView =
    document.getElementById("maintenanceView");

// VEÍCULO

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

// MANUTENÇÃO

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

// DADOS

let veiculos = [];

let manutencoesAtivas = [];

// UTILITÁRIOS

function hojeISO() {

    const agora =
        new Date();


    const ano =
        agora.getFullYear();


    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            agora.getDate()
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

// CARREGAR DADOS

async function carregarDados() {

    try {

        const [
            responseVeiculos,
            responseManutencoes
        ] = await Promise.all([

            fetch("/veiculos"),

            fetch("/manutencoes/ativas")

        ]);


        if (
            !responseVeiculos.ok
            ||
            !responseManutencoes.ok
        ) {

            throw new Error(
                "Não foi possível carregar os dados."
            );

        }


        veiculos =
            await responseVeiculos.json();


        manutencoesAtivas =
            await responseManutencoes.json();


        atualizarIndicadores();

        renderizarVeiculos(
            veiculos
        );

        renderizarManutencoes();

        atualizarSelectManutencao();


    } catch (error) {

        console.error(error);


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


async function carregarVeiculos() {

    await carregarDados();

}

// INDICADORES

function atualizarIndicadores() {

    const ativos =
        veiculos.filter(

            veiculo =>
                veiculo.ativo

        );


    const quantidadeManutencao =
        manutencoesAtivas.length;


    const disponiveis =
        ativos.length
        -
        quantidadeManutencao;


    totalVeiculos.textContent =
        veiculos.length;


    veiculosAtivos.textContent =
        Math.max(
            disponiveis,
            0
        );


    veiculosManutencao.textContent =
        quantidadeManutencao;


    maintenanceTotal.textContent =
        quantidadeManutencao;

}

// MANUTENÇÃO DO VEÍCULO

function buscarManutencaoAtiva(
    veiculoId
) {

    return manutencoesAtivas.find(

        manutencao =>

            manutencao.veiculo_id
            === veiculoId

    );

}

// TABELA DA FROTA

function renderizarVeiculos(lista) {

    tableBody.innerHTML = "";


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
                document.createElement("tr");


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

            } else if (veiculo.ativo) {

                statusHTML = `

                    <span
                        class="badge badge-active"
                    >
                        Disponível
                    </span>

                `;

            } else {

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

                    ${veiculo.categoria}

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

// TABELA DE MANUTENÇÕES

function renderizarManutencoes() {

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
                document.createElement("tr");


            row.innerHTML = `

                <td class="plate">

                    ${
                        veiculo
                        ?
                        veiculo.placa
                        :
                        "Veículo não encontrado"
                    }

                </td>


                <td>

                    ${manutencao.motivo}

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
                        class="action-button finish-maintenance"
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

// SELECT DE VEÍCULOS

function atualizarSelectManutencao() {

    maintenanceVehicle.innerHTML = `

        <option value="">
            Selecione uma placa
        </option>

    `;


    const veiculosDisponiveis =
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


            maintenanceVehicle.appendChild(
                option
            );

        }

    );

}

// NAVEGAÇÃO

function mostrarDashboard() {

    dashboardView
        .classList
        .add("active");


    maintenanceView
        .classList
        .remove("active");


    menuDashboard
        .classList
        .add("active");


    menuMaintenance
        .classList
        .remove("active");

}


function mostrarManutencoes() {

    dashboardView
        .classList
        .remove("active");


    maintenanceView
        .classList
        .add("active");


    menuDashboard
        .classList
        .remove("active");


    menuMaintenance
        .classList
        .add("active");

}


menuDashboard.addEventListener(
    "click",
    mostrarDashboard
);


menuMaintenance.addEventListener(
    "click",
    mostrarManutencoes
);

// BUSCA

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
                        .includes(busca)

            );


        renderizarVeiculos(
            resultado
        );

    }

);

// MODAL DE VEÍCULO

function abrirModalVeiculo() {

    vehicleModal
        .classList
        .add("active");


    vehicleFormMessage.textContent =
        "";

}


function fecharModalVeiculo() {

    vehicleModal
        .classList
        .remove("active");


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


        const placa =
            document
                .getElementById(
                    "vehiclePlate"
                )
                .value
                .trim()
                .toUpperCase();


        const tipo =
            document
                .getElementById(
                    "vehicleType"
                )
                .value;


        const categoria =
            document
                .getElementById(
                    "vehicleCategory"
                )
                .value;


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

                                placa,

                                tipo:
                                    tipo
                                    ||
                                    null,

                                categoria,

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
                    "Não foi possível cadastrar."

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
        .add("active");


    maintenanceFormMessage.textContent =
        "";

}


function fecharModalManutencao() {

    maintenanceModal
        .classList
        .remove("active");


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
                    "Não foi possível registrar a manutenção."

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


        const maintenanceId =
            button.dataset
                .maintenanceId;


        const confirmar =
            window.confirm(
                "Confirmar o retorno deste veículo à operação?"
            );


        if (!confirmar) {

            return;

        }


        button.disabled =
            true;


        button.textContent =
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


            button.disabled =
                false;


            button.textContent =
                "Registrar retorno";

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

// ESC

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

    }

);

// INICIALIZAÇÃO

carregarDados();
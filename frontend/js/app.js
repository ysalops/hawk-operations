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


// =========================
// MODAL DE VEÍCULO
// =========================

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


// =========================
// DADOS
// =========================

let veiculos = [];

let manutencoesAtivas = [];


// =========================
// CARREGAMENTO INICIAL
// =========================

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


// Mantemos esse nome porque o cadastro
// de veículo já chama essa função.

async function carregarVeiculos() {

    await carregarDados();

}


// =========================
// INDICADORES
// =========================

function atualizarIndicadores() {

    const total =
        veiculos.length;


    const ativos =
        veiculos.filter(
            veiculo => veiculo.ativo
        );


    const quantidadeManutencao =
        manutencoesAtivas.length;


    const disponiveis =
        ativos.length
        -
        quantidadeManutencao;


    totalVeiculos.textContent =
        total;


    veiculosAtivos.textContent =
        disponiveis;


    veiculosManutencao.textContent =
        quantidadeManutencao;

}


// =========================
// VERIFICAR MANUTENÇÃO
// =========================

function veiculoEstaEmManutencao(
    veiculoId
) {

    return manutencoesAtivas.some(

        manutencao =>

            manutencao.veiculo_id
            === veiculoId

    );

}


// =========================
// RENDERIZAR TABELA
// =========================

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


            const emManutencao =
                veiculoEstaEmManutencao(
                    veiculo.id
                );


            let statusHTML;


            if (emManutencao) {

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


// =========================
// BUSCA
// =========================

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


// =========================
// MODAL DE VEÍCULO
// =========================

function abrirModalVeiculo() {

    vehicleModal
        .classList
        .add("active");


    vehicleFormMessage.textContent =
        "";


    vehicleFormMessage.className =
        "form-message";


    setTimeout(() => {

        document
            .getElementById(
                "vehiclePlate"
            )
            .focus();

    }, 100);

}


function fecharModalVeiculo() {

    vehicleModal
        .classList
        .remove("active");


    vehicleForm.reset();


    vehicleFormMessage.textContent =
        "";


    vehicleFormMessage.className =
        "form-message";

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


document.addEventListener(

    "keydown",

    event => {

        if (
            event.key === "Escape"
            &&
            vehicleModal
                .classList
                .contains("active")
        ) {

            fecharModalVeiculo();

        }

    }

);


// =========================
// CADASTRAR VEÍCULO
// =========================

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


        if (!placa) {

            vehicleFormMessage.textContent =
                "Informe a placa do veículo.";


            vehicleFormMessage.className =
                "form-message error";


            return;

        }


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
                    "Não foi possível cadastrar o veículo."

                );

            }


            vehicleFormMessage.textContent =
                `${data.placa} cadastrado com sucesso.`;


            vehicleFormMessage.className =
                "form-message success";


            await carregarDados();


            setTimeout(() => {

                fecharModalVeiculo();

            }, 700);


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


// =========================
// INICIALIZAÇÃO
// =========================

carregarDados();
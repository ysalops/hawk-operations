const tableBody =
    document.getElementById("veiculosTable");

const totalVeiculos =
    document.getElementById("totalVeiculos");

const veiculosAtivos =
    document.getElementById("veiculosAtivos");

const searchInput =
    document.getElementById("searchInput");

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

let veiculos = [];

function abrirModalVeiculo() {

    vehicleModal.classList.add("active");

    vehicleFormMessage.textContent = "";
    vehicleFormMessage.className = "form-message";

    setTimeout(() => {

        document
            .getElementById("vehiclePlate")
            .focus();

    }, 100);

}


function fecharModalVeiculo() {

    vehicleModal.classList.remove("active");

    vehicleForm.reset();

    vehicleFormMessage.textContent = "";
    vehicleFormMessage.className = "form-message";

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

        if (event.target === vehicleModal) {

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
            vehicleModal.classList.contains("active")
        ) {

            fecharModalVeiculo();

        }

    }

);


vehicleForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        const placa =
            document
                .getElementById("vehiclePlate")
                .value
                .trim()
                .toUpperCase();


        const tipo =
            document
                .getElementById("vehicleType")
                .value;


        const categoria =
            document
                .getElementById("vehicleCategory")
                .value;


        if (!placa) {

            vehicleFormMessage.textContent =
                "Informe a placa do veículo.";

            vehicleFormMessage.className =
                "form-message error";

            return;

        }


        saveVehicleButton.disabled = true;

        saveVehicleButton.textContent =
            "Cadastrando...";


        try {

            const response =
                await fetch(
                    "/veiculos",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            placa,

                            tipo:
                                tipo || null,

                            categoria,

                            ativo: true

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


            await carregarVeiculos();


            setTimeout(() => {

                fecharModalVeiculo();

            }, 700);


        } catch (error) {

            vehicleFormMessage.textContent =
                error.message;

            vehicleFormMessage.className =
                "form-message error";

        } finally {

            saveVehicleButton.disabled = false;

            saveVehicleButton.textContent =
                "Cadastrar veículo";

        }

    }

);

async function carregarVeiculos() {

    try {

        const response =
            await fetch("/veiculos");


        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar os veículos."
            );

        }


        veiculos =
            await response.json();


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


function atualizarIndicadores() {

    totalVeiculos.textContent =
        veiculos.length;


    const ativos =
        veiculos.filter(
            veiculo => veiculo.ativo
        );


    veiculosAtivos.textContent =
        ativos.length;

}


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


            row.innerHTML = `

                <td class="plate">
                    ${veiculo.placa}
                </td>

                <td>
                    ${veiculo.tipo ?? "Não informado"}
                </td>

                <td>
                    ${veiculo.categoria}
                </td>

                <td>

                    <span
                        class="
                            badge
                            ${
                                veiculo.ativo
                                    ? "badge-active"
                                    : "badge-inactive"
                            }
                        "
                    >

                        ${
                            veiculo.ativo
                                ? "Ativo"
                                : "Inativo"
                        }

                    </span>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }

    );

}


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


carregarVeiculos();
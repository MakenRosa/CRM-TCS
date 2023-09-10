function createData (empresa, email, telefone, responsavel, origem_lead, criado, atualizado) {
  return {
    empresa,
    email,
    telefone,
    responsavel,
    origem_lead,
    criado: new Date(criado),
    atualizado: new Date(atualizado)
  }
}

export const rows = [
  createData('Empresa de Doces São Paulo', 'contato@docessp.com.br', '(11) 5555-1234', 'João Silva', 'Google', '2021-01-01', '2021-01-01'),
  createData('Companhia de Bebidas Rio de Janeiro', 'contato@bebidasrj.com.br', '(21) 5555-5678', 'Maria Santos', 'Facebook', '2021-01-02', '2021-01-02'),
  createData('Indústria de Cosméticos Minas Gerais', 'contato@cosmeticosmg.com.br', '(31) 5555-9012', 'Pedro Souza', 'LinkedIn', '2021-01-03', '2021-01-03'),
  createData('Fabricante de Roupas Bahia', 'contato@roupasba.com.br', '(71) 5555-3456', 'Ana Oliveira', 'Twitter', '2021-01-04', '2021-01-04'),
  createData('Empresa de Tecnologia Paraná', 'contato@tecnologiapr.com.br', '(41) 5555-7890', 'Lucas Costa', 'Google', '2021-01-05', '2021-01-05'),
  createData('Companhia de Alimentos Santa Catarina', 'contato@alimentosc.com.br', '(48) 5555-2345', 'Juliana Almeida', 'Facebook', '2021-01-05', '2021-01-05'),
  createData('Indústria de Móveis Rio Grande do Sul', 'contato@moveisrs.com.br', '(51) 5555-6789', 'Fernando Oliveira', 'LinkedIn', '2022-01-01', '2022-01-01'),
  createData('Fabricante de Brinquedos Ceará', 'contato@brinquedosce.com.br', '(85) 5555-0123', 'Mariana Lima', 'Twitter', '2022-01-02', '2022-01-02'),
  createData('Empresa de Transportes Distrito Federal', 'contato@transportesdf.com.br', '(61) 5555-4567', 'Rafaela Costa', 'Google', '2022-01-03', '2022-01-03'),
  createData('Companhia de Energia São Paulo', 'contato@energiasp.com.br', '(11) 5555-8901', 'Gustavo Santos', 'Facebook', '2022-01-04', '2022-01-04'),
  createData('Indústria de Papel e Celulose Mato Grosso', 'contato@papelecelulosemt.com.br', '(65) 5555-2345', 'Carla Silva', 'LinkedIn', '2022-01-05', '2022-01-05'),
  createData('Fabricante de Produtos de Limpeza Goiás', 'contato@produtoslimpeza.com.br', '(62) 5555-6789', 'Rodrigo Oliveira', 'Twitter', '2023-01-01', '2023-01-01'),
  createData('Empresa de Construção Civil Pernambuco', 'contato@construcaope.com.br', '(81) 5555-0123', 'Amanda Santos', 'Google', '2023-01-02', '2023-01-02')
]

export const headCells = [
    {
        id: 'empresa',
        numeric: false,
        disablePadding: true,
        label: 'Empresa'
      },
      {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'E-mail'
      },
      {
        id: 'telefone',
        numeric: true,
        disablePadding: false,
        label: 'Telefone'
      },
      {
        id: 'responsavel',
        numeric: false,
        disablePadding: false,
        label: 'Responsável'
      },
      {
        id: 'origem_lead',
        numeric: true,
        disablePadding: false,
        label: 'Origem do Lead'
      },
      {
        id: 'data_criacao',
        numeric: true,
        disablePadding: false,
        label: 'Data de Cadastro'
      }
    ]
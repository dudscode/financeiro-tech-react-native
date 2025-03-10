export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const transformType = (tipo: string) => {
  switch (tipo) {
    case "deposit":
      return "Depósito";
    case "transfer":
      return "Transferência";
    case "withdraw":
      return "Saque";
    case "payment":
      return "Pagamento";
    case "reversal":
      return "Estorno";
    case "loan":
      return "Empréstimo";
    case "docted":
      return "TED";
    default:
      return "Tipo não encontrado";
  }
};

export const transformValue = (tipo: string, value: number) => {
  switch (tipo) {
    case "deposit":
      return value;
    case "transfer":
      return -value;
    case "withdraw":
      return -value;
    case "payment":
      return -value;
    case "reversal":
      return value;
    case "loan":
      return -value;
    case "docted":
      return -value;
    default:
      return value;
  }
};

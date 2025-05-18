export type TransactionType = 'deposit' | 'transfer' | 'withdraw' | 'payment' | 'reversal' | 'loan' | 'docted';

export type ExtratoItemProps = {
    mes: string
    data: string
    tipo: TransactionType
    valor: number
    id: string,
    imagePath?: string | null
};
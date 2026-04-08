export interface Credito {
  credito: number
}

export interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  categoria: string;
}

export type TipoCategoriaClassificacao = 'Contas' | 'Materiais' | 'Pagamentos';

export const MAPEAMENTO_CATEGORIAS: Record<string, TipoCategoriaClassificacao> = {
  'conta de agua': 'Contas',
  'conta de energia': 'Contas',
  'gas': 'Contas',
  'conta de internet': 'Contas',
  'conta telefonica': 'Contas',
  'aluguel': 'Contas',
  'seguro': 'Contas',
  
  'cano redondo': 'Materiais',
  'cano quadrado': 'Materiais',
  'chapa': 'Materiais',
  'viga U': 'Materiais',
  'viga I': 'Materiais',
  'cantoneira': 'Materiais',
  'moveis': 'Materiais',
  'utensílios': 'Materiais',
  'higiene': 'Materiais',
  'produtos limpeza': 'Materiais',
  
  'salarios': 'Pagamentos',
  'prestacoes': 'Pagamentos',
  'servicos': 'Pagamentos',
  'consultoria': 'Pagamentos'
};


import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface GuaranteeItem {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly badge: string;
}

@Component({
  selector: 'app-guarantees',
  standalone: true,
  imports: [],
  templateUrl: './guarantees.html',
  styleUrl: './guarantees.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Guarantees {
  readonly guaranteeItems: readonly GuaranteeItem[] = [
    {
      id: 'torra-fresca',
      icon: '☕',
      title: 'Torra Artesanal Fresca Semanal',
      description:
        'Torramos semanalmente em pequenas fornadas artesanais. Seu café é embalado e despachado logo após a torra para garantir frescor absoluto.',
      badge: 'Torra Semanal',
    },
    {
      id: 'graos-especiais',
      icon: '🥇',
      title: 'Grãos 100% Arábica (84+ SCAA)',
      description:
        'Sem misturas ou defeitos. Apenas grãos colhidos no ápice da maturação em altitudes elevadas, classificados como café especial superior.',
      badge: 'Qualidade SCAA',
    },
    {
      id: 'embalagem-protegida',
      icon: '📦',
      title: 'Embalagem Válvula & Zip Lock',
      description:
        'Pacote com tripla camada e válvula desgaseificadora unidirecional. Libera os gases naturais da torra mantendo aromas e óleos essenciais intactos.',
      badge: 'Máxima Proteção',
    },
    {
      id: 'comercio-justo',
      icon: '🤝',
      title: 'Comércio Justo & Sustentável',
      description:
        'Relacionamento direto com pequenos produtores parceiros de Minas Gerais, garantindo preço justo e incentivando a agricultura sustentável.',
      badge: 'Origem Sustentável',
    },
  ];
}

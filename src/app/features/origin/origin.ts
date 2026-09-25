import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface OriginHighlight {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly metricLabel: string;
}

@Component({
  selector: 'app-origin',
  standalone: true,
  imports: [],
  templateUrl: './origin.html',
  styleUrl: './origin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Origin {
  readonly highlights: readonly OriginHighlight[] = [
    {
      id: 'secagem',
      icon: '☀️',
      title: 'Secagem Natural ao Sol',
      description:
        'Grãos secados ao sol em terreiros para preservar os açúcares naturais e intensificar a doçura e acidez equilibrada.',
      metric: '100% Natural',
      metricLabel: 'Secagem ao Sol',
    },
    {
      id: 'colheita',
      icon: '🤲',
      title: 'Colheita 100% Manual & Seletiva',
      description:
        'A colheita é inteiramente artesanal. Nossos produtores parceiros colhem apenas os frutos no ponto perfeito de maturação.',
      metric: '100%',
      metricLabel: 'Seleção Artesanal',
    },
    {
      id: 'rastreabilidade',
      icon: '📜',
      title: 'Rastreabilidade & Origem Garantida',
      description:
        'Cada lote possui rastreabilidade total desde a fazenda parceira até a torra, garantindo procedência e controle de qualidade.',
      metric: '84+',
      metricLabel: 'Pontos SCAA',
    },
  ];
}

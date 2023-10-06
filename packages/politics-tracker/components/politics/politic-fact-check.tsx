import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import CorrectIcon from '~/public/icons/factcheck-correct.svg'
import IncorrectIcon from '~/public/icons/factcheck-incorrect.svg'
import ChangedIcon from '~/public/icons/position-changed.svg'
import ConsistentIcon from '~/public/icons/position-consistent.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'

const Wrapper = styled.div`
  padding: 12px 0;

  font-size: 12px;
  font-weight: 500;
  line-height: 14px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
  }
`
const CheckAbstract = styled.div`
  display: flex;
  span {
    margin-left: 4px;
  }

  .position-changed {
    color: #b2800d;
  }
  .position-consistent {
    color: #838383;
  }
  .fact-correct {
    color: #208f96;
  }
  .fact-incorrect {
    color: #c0374f;
  }
  .expert {
    color: #544ac9;
  }
  .similar {
    color: #838383;
  }
`

export default function FactCheckAbstract(): JSX.Element {
  return (
    <Wrapper>
      <CheckAbstract>
        <ChangedIcon />
        <span className="position-changed">立場變化</span>
        <ConsistentIcon />
        <span className="position-consistent">立場變化</span>
      </CheckAbstract>

      <CheckAbstract>
        <CorrectIcon />
        <span className="fact-correct">事實釐清</span>
        <IncorrectIcon />
        <span className="fact-incorrect">事實釐清</span>
      </CheckAbstract>

      <CheckAbstract>
        <ExpertIcon />
        <span className="expert">專家看點</span>
      </CheckAbstract>

      <CheckAbstract>
        <SimilarIcon />
        <span className="similar">相似政策</span>
      </CheckAbstract>
    </Wrapper>
  )
}

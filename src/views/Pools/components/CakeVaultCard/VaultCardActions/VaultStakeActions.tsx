import { Flex, Skeleton, useModal } from '@fathomswap/uikit'
import BigNumber from 'bignumber.js'
import { DeserializedPool, VaultKey } from 'state/types'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { VaultStakeButtonGroup } from '../../Vault/VaultStakeButtonGroup'
import VaultStakeModal from '../VaultStakeModal'
import LockedStakeModal from '../../LockedPool/Modals/LockedStakeModal'
import HasSharesActions from './HasSharesActions'

interface VaultStakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  accountHasSharesStaked: boolean
  performanceFee: number
}

const VaultStakeActions: React.FC<React.PropsWithChildren<VaultStakeActionsProps>> = ({
  pool,
  stakingTokenBalance,
  accountHasSharesStaked,
  performanceFee,
}) => {
  const { stakingToken, userDataLoaded } = pool
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(
    <VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} performanceFee={performanceFee} />,
  )
  const [openPresentLockedStakeModal] = useModal(
    <LockedStakeModal
      currentBalance={stakingTokenBalance}
      stakingToken={stakingToken}
      stakingTokenBalance={stakingTokenBalance}
    />,
  )

  const renderStakeAction = () => {
    return accountHasSharesStaked ? (
      <HasSharesActions pool={pool} stakingTokenBalance={stakingTokenBalance} performanceFee={performanceFee} />
    ) : (
      <VaultStakeButtonGroup
        onFlexibleClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
        onLockedClick={pool.vaultKey === VaultKey.CakeVault ? openPresentLockedStakeModal : null}
      />
    )
  }

  return (
    <Flex flexDirection="column">{userDataLoaded ? renderStakeAction() : <Skeleton width="100%" height="52px" />}</Flex>
  )
}

export default VaultStakeActions

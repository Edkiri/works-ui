import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetBudget } from '../../features/budget/hooks';
import {
  Budget,
  CreateOrUpdateBudgetModal,
} from '../../features/budget/components';
import { Work } from '../../features/work/components';
import { Work as WorkInterface } from '../../features/work/interfaces';
import './Budget.css';
import { CreateButton } from '../../features/ui';

interface BudgetState {
  work: WorkInterface;
}

export function BudgetPage() {
  const { work } = useLocation().state as BudgetState;
  const { budgets, onCreate, onUpdate } = useGetBudget(work.id);
  const [createModal, setCreateModal] = useState(false);

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  return (
    <div className="BudgetPageContainer">
      <Work work={work} isDetail />
      <div className="BudgetListContainer">
        <div className="BudgetPageTitleContainer">
          <h1>Partidas</h1>
          <CreateButton onClick={openCreateModal} />
        </div>
        <div className="BudgetList">
          {budgets.map((budget) => (
            <Budget
              work={work}
              key={budget.id}
              budget={budget}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
      {createModal && (
        <CreateOrUpdateBudgetModal
          work={work}
          onCreate={onCreate}
          closeModal={closeCreateModal}
        />
      )}
    </div>
  );
}
import { Select } from 'components/select';

type SelectLotteryProps = {
  onChange: (value: string) => void;
  defaultValue?: string;
  options: Array<string>;
};

function SelectLottery(props: SelectLotteryProps) {
  const { onChange, options, ...rest } = props;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.currentTarget.value);
  }

  return (
    <Select
      aria-label="Escolha a Loteria"
      id="lotteries"
      onChange={handleChange}
      {...rest}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

export { SelectLottery };

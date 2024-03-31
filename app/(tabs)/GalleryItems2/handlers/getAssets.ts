import { useAssets } from "../../../../services/hooks/useAssets";

export const getAssets = () => {

  const { assets, setAssets, loading, updateAssets } = useAssets();

};
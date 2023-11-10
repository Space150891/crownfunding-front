import { styled, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { useAppDispatch, useShallowEqualSelector } from '../../hooks/redux-typed-hooks'
import { CampsModel } from '../../models/campaigns.model'
import { StyledFrom, SubmitButton } from '../../pages/campaign/[id]'
import { createCampRequest, getAllCampsRequest } from '../../store/campaigns'
import CampsCard from './card'

const Campaigns = () => {
  const dispatch = useAppDispatch()
  const { data: camps } = useShallowEqualSelector(s => s.campaigns)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      goal: 0,
    },
    onSubmit: async (values: Partial<CampsModel>) => {
      await dispatch(createCampRequest(values))
      await dispatch(getAllCampsRequest())
    },
  })

  const campsItems = useMemo(() => {
    return camps.map((campaign: any) => <CampsCard key={campaign.id} data={campaign} />)
  }, [camps])

  return (
    <>
      <Container>{campsItems}</Container>

      <StyledFrom onSubmit={formik.handleSubmit}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Create Campaign
        </Typography>
        <TextField
          label="Name"
          name="name"
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          label="Description"
          name="description"
          id="description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <TextField
          label="Goal (USD)"
          name="goal"
          id="goal"
          type="number"
          onChange={formik.handleChange}
        />
        <SubmitButton variant="contained" type="submit">
          Create
        </SubmitButton>
      </StyledFrom>
    </>
  )
}

export default Campaigns

const Container = styled('div')`
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 40px;
`

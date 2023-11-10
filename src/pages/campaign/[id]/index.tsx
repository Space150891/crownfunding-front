import { styled, Typography, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useAppDispatch, useShallowEqualSelector } from '@app/hooks/redux-typed-hooks'
import { UsersModel } from '@app/models/users.model'
import { createDonationRequest, getCampByIdRequest } from '@app/store/campaigns'
import { isEmpty } from '@app/utils/global'

const Campaign = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { current: camp } = useShallowEqualSelector(s => s.campaigns)
  const { id } = router.query

  const formik = useFormik({
    initialValues: {
      nickname: '',
      amount: 0,
    },
    onSubmit: async (values: Partial<UsersModel>) => {
      await dispatch(createDonationRequest({ ...values, campaignId: id }))
      await dispatch(getCampByIdRequest(id))
    },
  })

  return (
    <Camp>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Name: {camp.name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Goal: {camp.goal} USD
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Balance: {camp.balance} USD
      </Typography>
      {isEmpty(camp?.users) ? (
        <p>No donations yet😯</p>
      ) : (
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Donators
          {camp?.users?.map(user => (
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom key={user.id}>
              Nickname: {user.nickname} Amount: {user.amount}
            </Typography>
          ))}
        </Typography>
      )}
      <StyledFrom onSubmit={formik.handleSubmit}>
        <TextField
          label="nickname"
          name="nickname"
          id="nickname"
          type="text"
          value={formik.values.nickname}
          onChange={formik.handleChange}
        />
        <TextField
          label="amount (USD)"
          name="amount"
          id="amount"
          type="number"
          onChange={formik.handleChange}
        />
        <SubmitButton variant="contained" type="submit">
          Donate
        </SubmitButton>
      </StyledFrom>
    </Camp>
  )
}

export default Campaign

export const Camp = styled('div')`
  padding: 20px;
  margin: 0 auto;
`

export const SubmitButton = styled(Button)`
  color: #fff;
`

export const StyledFrom = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2a37ea;
  gap: 20px;
`

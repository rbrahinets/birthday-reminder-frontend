import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTranslation } from 'react-i18next'
import { TiUserDelete } from 'react-icons/ti'
import { FaRegEdit } from 'react-icons/fa'
import { actionCreators } from '../state'
import Button from './Button'
import { deleteOldImage } from './FirebaseImage'
import birthdayService from '../services/BirthdayService'


const BirthdayInfo = ({ updateBirthdayInfo }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { search } = useLocation()
  const { t } = useTranslation()

  const queryParams = new URLSearchParams(search)
  const birthdayId = queryParams.get('birthdayId')

  const { isBirthdayInfoMode } = useSelector((state) => state.isBirthdayInfoMode)
  const { birthday } = useSelector((state) => state.birthday)

  const {
    setLoading,
    setIsBirthdayInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch,
  )

  const getBirthdayInfo = () => {
    if (!birthday) {
      return
    }

    const originalDate = new Date(birthday.dateOfBirth)
    const day = originalDate.getUTCDate().toString().padStart(2, '0')
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = originalDate.getUTCFullYear()
    const formattedDate = `${day}/${month}/${year}`

    return (
      <div className={'info-container'}>
        <div>{birthday.firstName} {birthday.lastName}</div>
        <div>{birthday.email}</div>
        <div>{formattedDate}</div>
      </div>
    )
  }

  const handleEdit = () => {
    setIsBirthdayInfoMode(false)
  }

  const handleDelete = () => {
    deleteBirthday().then(() => navigate(`/birthdays`))
  }

  const deleteBirthday = async () => {
    await deleteOldImage(birthday.imageUrl)
    await birthdayService.delete(birthdayId)
  }

  useEffect(() => {
    setLoading(true)
    setIsBirthdayInfoMode(true)
    updateBirthdayInfo()
      .then(
        () => {
          setLoading(false)
          window.scrollTo(0, 0)
        },
      )
  }, [])

  return (
    <div className={'info-container'}>
      <h1>{t('info')}</h1>
      {getBirthdayInfo()}
      <Button
        text={t('edit')}
        onClick={handleEdit}
        IconTag={FaRegEdit}
      />
      <br/>
      <Button
        text={t('delete')}
        onClick={handleDelete}
        IconTag={TiUserDelete}
      />
    </div>
  )
}

export default BirthdayInfo

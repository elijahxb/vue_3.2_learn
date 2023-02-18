export const steps = (i18n) => [
  {
    element: '#guide',
    popover: {
      title: i18n('driver.guideBtn'),
      description: '点击此处开始引导',
      position: 'left'
    }
  },
  {
    element: '#siderTypeId',
    popover: {
      title: i18n('driver.hamburgerBtn'),
      description: '点击此处可折叠/打开菜单栏',
      position: 'bottom-left'
    }
  },
  {
    element: '#fullScreen',
    popover: {
      title: i18n('driver.fullScreen'),
      description: '点击此处可全屏/取消全屏',
      position: 'left'
    }
  }
]

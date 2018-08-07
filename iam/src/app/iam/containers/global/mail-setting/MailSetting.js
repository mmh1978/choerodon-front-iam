/**
 * Created by chenbinjie on 2018/8/6.
 */

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Select, Table, Tooltip, Form, Spin, Radio } from 'choerodon-ui';
import { axios, Content, Header, Page, Permission } from 'choerodon-front-boot';
import { injectIntl, FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import './MailSetting.scss';
import MailSettingStore from '../../../stores/global/mail-setting/index';

const intlPrefix = 'global.mailsetting';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 100 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
};

@Form.create({})
@withRouter
@injectIntl
@inject('AppState')
@observer
export default class MailSetting extends Component {
  constructor(props) {
    super(props);
    this.loadMailSetting = this.loadMailSetting.bind(this);
    this.state = this.getInitState();
  }

  componentDidMount() {
    this.loadMailSetting();
  }

  getInitState() {
    return {
      loading: false,
      saving: false,
    };
  }

  /* 加载邮件配置 */
  loadMailSetting = () => {
    const { intl } = this.props;
    // TODO 加载函数
  }

  handleRefresh = () => {
    this.loadMailSetting();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO 提交函数
  }

  render() {
    const { intl, form } = this.props;
    const { loading, saving } = this.state;
    const { getFieldDecorator } = form;
    const inputWidth = '512px';
    const mainContent = (
      <div className={classnames('c7n-mailsetting-container', { 'c7n-mailsetting-loading-container': loading })}>
        {loading ? <Spin size="large" /> : (
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('code', {
                rules: [{
                  required: true,
                }],
                initialValue: 998,
              })(
                <Input label={intl.formatMessage({ id: `${intlPrefix}.code` })} style={{ width: inputWidth }} disabled autoComplete="off" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('account', {
                rules: [],
                initialValue: 998,
              })(
                <Input label={intl.formatMessage({ id: `${intlPrefix}.sending.mail` })} style={{ width: inputWidth }} autoComplete="off" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('password', {
                rules: [],
                initialValue: 998,
              })(
                <Input label={intl.formatMessage({ id: `${intlPrefix}.sending.password` })} style={{ width: inputWidth }} autoComplete="off" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('serverType', {
                rules: [],
                initialValue: 'POP3',
              })(
                <Select
                  getPopupContainer={() => document.getElementsByClassName('page-content')[0]}
                  label={intl.formatMessage({ id: `${intlPrefix}.server.type` })}
                  style={{ width: inputWidth }}
                >
                  <Option value="SMTP">SMTP</Option>
                  <Option value="POP3">POP3</Option>
                  <Option value="IMAP">IMAP</Option>

                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('SSL', {
                initialValue: 'Y',
              })(
                <RadioGroup
                  className="sslRadioGroup"
                  label={intl.formatMessage({ id: `${intlPrefix}.ssl` })}
                >
                  <Radio value={'Y'}><FormattedMessage id="yes" /></Radio>
                  <Radio value={'N'}><FormattedMessage id="no" /></Radio>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('port', {
                rules: [],
                initialValue: 998,
              })(
                <Input label={intl.formatMessage({ id: `${intlPrefix}.port` })} style={{ width: inputWidth }} autoComplete="off" />,
              )}
            </FormItem>
            <hr className="divider" />
            <Permission service={['iam-service.ldap.update']}>
              <div className="btnGroup">
                <Button
                  funcType="raised"
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                >
                  <FormattedMessage id="modify" />
                </Button>
                <Button
                  funcType="raised"
                  onClick={() => {
                    const { resetFields } = this.props.form;
                    resetFields();
                  }}
                  style={{ color: '#3F51B5' }}
                  disabled={saving}
                >
                  <FormattedMessage id="cancel" />
                </Button>
              </div>
            </Permission>
          </Form>
        )}
      </div>
    )


    return (
      <Page
        service={['manager-service.service.pageManager']}
      >
        <Header
          title={<FormattedMessage id={`${intlPrefix}.header.title`} />}
        >
          <Button
            onClick={this.handleRefresh}
            icon="refresh"
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content
          code={intlPrefix}
          values={{ name: `${process.env.HEADER_TITLE_NAME || 'Choerodon'}` }}
        >
          {mainContent}
        </Content>
      </Page>
    );
  }
}